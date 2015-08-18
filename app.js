/**
 * Created by chenglian on 15/6/18.
 */
var express = require("express");
var bodyParser  = require("body-parser");
var Router = require(__dirname + "/routes/index.js");
var logger = require('morgan');
var app  = express();
var compression = require('compression');


//important for CORS
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

//config the server
app.use(compression({filter: shouldCompress}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("combined"));

new Router(app);//start routes

module.exports = app;
