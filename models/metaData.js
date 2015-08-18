/**
 * Created by chenglian on 15/6/21.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var metaData = sequelize.define("metaData", {
        tableName: DataTypes.STRING,
        version:DataTypes.STRING
    },{
        indexes:[
            {
                unique:true,
                fields:['tableName']
            }
        ]
    });

    return metaData;
};