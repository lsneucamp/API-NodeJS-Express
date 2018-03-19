var dbm = global.dbm || require('db-migrate');
var ObjectId = require('mongodb').ObjectID;


exports.up = function (db, next) {
    console.log("exports.up -> add nodes");

    var nodes = [
        {"_id": ObjectId("54f6612bb0e6af1800b5d00A"), "name": "A"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00B"), "name": "B"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00C"), "name": "C"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00D"), "name": "D"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00D"), "name": "D"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00D"), "name": "D"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00D"), "name": "D"},
        {"_id": ObjectId("54f6612bb0e6af1800b5d00E"), "name": "E"}
    ];

    var remaning = nodes.length;


    for (var i = 0; i < nodes.length; i++) {
        db.insert("nodes", nodes[i], function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (--remaning === 0)
                next();
        })
    }


};


exports.down = function (db, callback) {
    db.dropCollection("nodes", callback);
};
