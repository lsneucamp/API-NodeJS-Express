var express = require('express');
var router = express.Router();

var NodeService = require('./nodes-service');

var findAll = function (req, res, next) {
    NodeService
            .findAll()
            .then(function (docs) {
                res.json(docs);
            }, function (error) {
                var err = new Error(error.toString());
                next(err);
            });
};

var findOne = function (req, res, next) {
    if (req.params.id === undefined) {
        var err = new Error("id não especificado");
        err.status = 400;
        return next(err);
    }

    NodeService
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


router.get('/nodes/', findAll);
router.get('/nodes/:id', findOne);

module.exports = router;

