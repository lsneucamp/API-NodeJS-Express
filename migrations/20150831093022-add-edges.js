var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var ObjectId = require('mongodb').ObjectID;


exports.up = function (db, next) {

    var edges = [
        {"_id": ObjectId("54f6612bb0e6af1800b5dE0A"),
            "nodeA": ObjectId("54f6612bb0e6af1800b5d00A"),
            "nodeB": ObjectId("54f6612bb0e6af1800b5d00B"),
            distance: 10
        },
        {"_id": ObjectId("54f6612bb0e6af1800b5dE0B"),
            "nodeA":  ObjectId("54f6612bb0e6af1800b5d00B"),
            "nodeB": ObjectId("54f6612bb0e6af1800b5d00D"),
            distance: 15
        },
        {"_id": ObjectId("54f6612bb0e6af1800b5dE0C"),
            "nodeA":  ObjectId("54f6612bb0e6af1800b5d00A"),
            "nodeB":  ObjectId("54f6612bb0e6af1800b5d00C"),
            distance: 20
        },
        {"_id": ObjectId("54f6612bb0e6af1800b5dE0D"),
            "nodeA":  ObjectId("54f6612bb0e6af1800b5d00C"),
            "nodeB":  ObjectId("54f6612bb0e6af1800b5d00D"),
            distance: 30
        },
        {"_id": ObjectId("54f6612bb0e6af1800b5dE0E"),
            "nodeA":  ObjectId("54f6612bb0e6af1800b5d00B"),
            "nodeB":  ObjectId("54f6612bb0e6af1800b5d00E"),
            distance: 50
        },
        {"_id": ObjectId("54f6612bb0e6af1800b5dE0F"),
            "nodeA":  ObjectId("54f6612bb0e6af1800b5d00D"),
            "nodeB":  ObjectId("54f6612bb0e6af1800b5d00E"),
            distance: 30
        }
    ];
    
    
    var remaning = edges.length;
    for (var i = 0; i < edges.length; i++) {
        db.insert("edges", edges[i], function (err) {
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
    db.dropCollection("edges", callback);
};