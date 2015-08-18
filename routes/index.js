/**
 * Created by chenglian on 15/6/20.
 */
var crypto = require('crypto');
var express = require('express');
var router = express.Router();

var Engine = require(__dirname +  '/engine.js');
var db  = require(__dirname +'/../models');


function ROUTER(app) {
    var self = this;

    new Engine(app, router, db, crypto);
    //add other routes here
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


module.exports = ROUTER;