/**
 * Created by chenglian on 15/6/20.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var media = sequelize.define("media", {
        type: DataTypes.ENUM('img', 'video'),
        url: DataTypes.STRING,//url
        code: DataTypes.STRING,
        order:{type: DataTypes.INTEGER, allowNull:false, defaultValue: 0}
    });

    return media;
};
