var q = require('q');
var async = require('async');
// models
var Edge = require('./edges-model');

module.exports.findAll = function () {
    return q(Edge
            .find()
            .exec());
};

module.exports.findOne = function (id) {
    id = (id._id !== undefined) ? id._id : id;
    return q(Edge
            .findOne({_id: id})
            .populate("nodeA")
            .populate("nodeB")
            .exec());
};

var findByNodeA = module.exports.findByNodeA = function (node) {
    var id = (node !== undefined && node._id !== undefined) ? node._id : node;
    return q(Edge
            .find({nodeA: id})
            .populate("nodeA")
            .populate("nodeB")
            .exec());
};

var walker = module.exports.walker = function (sourceNode, destNode, pathWalked) {

    if (pathWalked === undefined) {
        pathWalked = [];
    }

    return findByNodeA(sourceNode).then(
            function (edges) {
                var deferred = q.defer();
                if (sourceNode.equals(destNode)) {
                    deferred.reject("ponto de origem é o mesmo que o ponto de destino");
                } else {

                    var pathStack = [];
                    var asyncWalkers = [];

                    edges.forEach(function (edge) {
                        var forkedPath = forkPath(pathWalked);
                        // 1. verifica se o caminho está repetido
                        if (!contains(forkedPath, edge)
                                && !containsBidirectionalRef(forkedPath, edge)) {
                            forkedPath.push(edge);
                            // verifica se este edge leva ao destino
                            if ((edge.nodeB.equals(destNode))) {
                                // calcular o custo
                                var distance = 0;
                                forkedPath.forEach(function (edge) {
                                    distance += edge.distance;
                                });
                                asyncWalkers.push(function (callback) {
                                    callback(null, [{path: forkedPath, distance: distance}]);
                                });
                            } else {
                                asyncWalkers.push(function (callback) {
                                    walker(edge.nodeB, destNode, forkedPath)
                                            .then(function (pathStack) {
                                                callback(null, pathStack);
                                            });
                                });
                            }
                        }
                    });

                    if (asyncWalkers.length > 0) {
                        async.series(asyncWalkers, function (err, results) {
                            if (results.length > 0) {
                                results.forEach(function (pathStackSeries) {
                                    pathStack = pathStack.concat(pathStackSeries);
                                });
                            }
                            deferred.resolve(pathStack);
                        });
                    } else {
                        deferred.resolve(pathStack);
                    }
                }
                return deferred.promise;
            }
    );
};

var contains = function (arr, edge) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id.toString().toLowerCase() === edge._id.toString().toLowerCase()) {
            return true;
        }
    }
    return false;
};

var containsBidirectionalRef = function (arr, edge) {
    if (arr.length > 0) {
        var currentNodeAEqualsNextNodeB
                = arr[arr.length - 1].nodeA._id.toString().toLowerCase() === edge.nodeB._id.toString().toLowerCase();
        var nextNodeAEqualsCurrentNodeB
                = edge.nodeA._id.toString().toLowerCase() === arr[arr.length - 1].nodeB._id.toString().toLowerCase();
        return nextNodeAEqualsCurrentNodeB && currentNodeAEqualsNextNodeB;
    }
    return false;
};
var forkPath = function (path) {
    return JSON.parse(JSON.stringify(path));
};

// somente para depuração
// converte edge em string legivel
var edgeToString = function (edge) {
    return edge.nodeA.name + " - > " + edge.nodeB.name;
};
// somente para depuração
// converte edges em string legiveis
var edgesToString = function (edges) {
    var arr = [];
    if (edges)
        edges.forEach(function (edge) {
            arr.push(edgeToString(edge));
        });
    return arr;
};

var EdgeException = function (value, message) {
    this.value = value;
    this.message = message;
    this.toString = function () {
        return this.value + this.message;
    };
}

