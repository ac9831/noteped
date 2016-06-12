var sequelize = require('Sequelize');
var config = require('../config/sequelize_config');
var label = config.define('label',{
    
    id : sequelize.INTEGER,
    title : sequelize.STRING,
    description : sequelize.STRING,
    createdate : sequelize.DATE
});

label.sync();

module.exports = label;