var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EdgeSchema   = new Schema({
    nodeA: {type: mongoose.Schema.Types.ObjectId, ref: 'nodes'},
    nodeB: {type: mongoose.Schema.Types.ObjectId, ref: 'nodes'},
    distance: {type: Number}
});

module.exports = mongoose.model('edges', EdgeSchema);


