var express = require('express');
var router = express.Router();
var q = require('q');
var EdgeService = require('./edges-service');
var NodeService = require('../nodes/nodes-service');



var findAllPaths = function (req, res, next) {
    walker(req, next).then(function (paths) {
        if (!paths || paths.length === 0)
            return res.json({});

        var autonomy = req.query.autonomy;
        var fuelCost = req.query.fuelCost;

        if (autonomy
                && fuelCost) {
            paths.map(function (path) {
                path.cost = (parseFloat(path.distance) / parseFloat(autonomy)) * parseFloat(fuelCost);
            });
        }

        res.json(paths);
    }, function (error) {
        var err = new Error(error.toString());
        next(err);
    });
};

var findBestPath = function (req, res, next) {
    walker(req, next).then(function (paths) {
        if (!paths || paths.length === 0)
            return res.json({});

        var bestDistance = Number.POSITIVE_INFINITY;
        var bestIndex = -1;

        paths.forEach(function (path, index) {
            if (path.distance < bestDistance) {
                bestDistance = path.distance;
                bestIndex = index;
            }
        });

        var autonomy = req.query.autonomy;
        var fuelCost = req.query.fuelCost;

        if (autonomy
                && fuelCost) {
            paths[bestIndex].cost = (parseFloat(paths[bestIndex].distance) / parseFloat(autonomy)) * parseFloat(fuelCost);
        }
        res.json([paths[bestIndex]]);
    }, function (error) {
        var err = new Error(error.toString());
        next(err);
    });
};

var findWorstPath = function (req, res, next) {
    walker(req, next).then(function (paths) {
        if (!paths || paths.length === 0)
            return res.json({});

        var worstDistance = Number.NEGATIVE_INFINITY;
        var worstIndex = -1;

        paths.forEach(function (path, index) {
            if (path.distance > worstDistance) {
                worstDistance = path.distance;
                worstIndex = index;
            }
        });

        var autonomy = req.query.autonomy;
        var fuelCost = req.query.fuelCost;

        if (autonomy !== undefined
                && fuelCost !== undefined) {
            paths[worstIndex].cost = (parseFloat(paths[worstIndex].distance) / parseFloat(autonomy)) * parseFloat(fuelCost);

        }
        res.json([paths[worstIndex]]);
    }, function (error) {
        var err = new Error(error.toString());
        next(err);
    });
};



var walker = function (req, next) {
    var sourceNodeId, destNodeId;

    if (!req.query.sourceNodeId) {
        var err = new Error("Ponto de origem não especificado");
        err.status = 400;
        next(err);
    }
    if (!req.query.destNodeId) {
        var err = new Error("Ponto de destino não especificado");
        err.status = 400;
        next(err);
    }

    var sourceNodeId = req.query.sourceNodeId;
    var destNodeId = req.query.destNodeId;

    if (sourceNodeId === destNodeId) {
        var err = new Error("ponto de origem é o mesmo que o ponto de destino");
        err.status = 400;
        next(err);
    }

    return NodeService
            .findOne(sourceNodeId)
            .then(function (doc) {
                sourceNode = doc;
                return q();
            })
            .then(
                    function () {
                        return  NodeService
                                .findOne(destNodeId);
                    }
            )
            .then(function (doc) {
                destNode = doc;
                return q();
            })
            .then(function () {
                return EdgeService
                        .walker(sourceNode, destNode);
            });


};

var findOne = function (req, res, next) {
    if (req.params.id === undefined) {
        var err = new Error("id não especificado");
        err.status = 400;
        return next(err);
    }

    EdgeService
            .findOne(req.params.id)
            .then(function (doc) {
                if (!doc) {
                    var err = new Error("Node não encontrado");
                    err.status = 404;
                    return next(err);
                }
                res.json(doc);
            }, function (error) {
                var err = new Error(error.toString());
                next(err);
            });

};


/**
 * resolver
 * função que filtra os parametros da URI e os parametros da query da URL
 * com objetivo de definir que metodo será excutado
 */
var resolver = function (req, res, next) {
    if (req.query.paths) {
        switch (req.query.paths) {
            case "all":
                findAllPaths(req, res, next);
                break;
            case "best":
                findBestPath(req, res, next);
                break;
            case "worst":
                findWorstPath(req, res, next);
                break;
            default :
                var err = new Error("O parametro 'paths' especificado não existe");
                err.status = 400;
                next(err);
                break;
        }
    } else {
        // caso não seja definido nenhum parametro esperado para req.query
        // retorna todos os edges
        EdgeService
                .findAll()
                .then(function (docs) {
                    res.json(docs);
                }, function (error) {
                    var err = new Error(error.toString());
                    next(err);
                });
    }
};

router.get('/edges/', resolver);
router.get('/edges/:id', findOne);

module.exports = router;

