var sequelize = require('Sequelize');
var config = require('../config/sequelize_config');
var label = config.define('label',{
    
    title : {type: sequelize.STRING(200), allowNull : false},
    description : {type: sequelize.TEXT}
});

label.sync();

module.exports = label;