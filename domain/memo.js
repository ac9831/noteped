var sequelize = require('Sequelize');
var config = require('../config/sequelize_config');
var label = require('./label');
var memo = config.define('memo',{

    title : {type: sequelize.STRING(200), allowNull : false},
    content : sequelize.TEXT,
});

memo.sync();

module.exports = memo;