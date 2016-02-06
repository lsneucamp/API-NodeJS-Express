var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbconfig = require('./database');

// require modules
var nodesController = require('./modules/nodes/nodes-controller');
var edgesController = require('./modules/edges/edges-controller');



var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


var app = express();

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: false}));

// index routers

app.use('/api/v1/', nodesController);
app.use('/api/v1/', edgesController);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
console.log("app.get('env') ", app.get('env'));
if (app.get('env') === 'development') {
    mongoose.connect("mongodb://" + dbconfig.dev.host + "/" + dbconfig.dev.database);

    app.use(function (err, req, res, next) {
        //console.log(res.status);
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
} else {
    mongoose.connect("mongodb://" + dbconfig.prod.host + "/" + dbconfig.prod.database);
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
}






module.exports = app;
