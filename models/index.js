/**
 * Created by chenglian on 15/6/20.
 */

var fs        = require("fs");
var config = require(__dirname +  '/../config.js');
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var dbConfig = require(__dirname + '/../models/config.json')[config.env];
var url = require('url');


if(process.env.DB_PORT){
    var conurl = url.parse(process.env.DB_PORT);
    dbConfig.host = conurl.hostname;
    dbConfig.port = conurl.port;
    dbConfig.password = process.env.DB_ENV_MYSQL_ROOT_PASSWORD;
}else{
    dbConfig.host = 'ec2-52-28-68-241.eu-central-1.compute.amazonaws.com';
    //dbConfig.host = 'localhost';
    dbConfig.port = '3306';
    dbConfig.password = 'root';
}

dbConfig.host = 'ec2-52-28-68-241.eu-central-1.compute.amazonaws.com';
dbConfig.port = '3306';

var sequelize = new Sequelize('iprices', dbConfig.username, dbConfig.password, dbConfig);

var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "config.json");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;