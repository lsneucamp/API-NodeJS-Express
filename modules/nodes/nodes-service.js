var q = require('q');
// models
var Node = require('./nodes-model');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports.findAll = function () {
    return q(Node
            .find()
            .exec());
};

module.exports.findOne = function (id) {
    if(id instanceof ObjectId) {
        id = id._id.toString();
    } 
    return Node
            .findOne({_id: id})
            .exec();
};

