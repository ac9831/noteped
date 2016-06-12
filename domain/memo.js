var sequelize = require('Sequelize');
var config = require('../config/sequelize_config');
var memo = config.define('memo',{

    id : sequelize.INTEGER,
    title : sequelize.STRING,
    content : sequelize.TEXT,
    createdate : sequelize.DATE,
    labelid : sequelize.INTEGER
});

memo.sync();

module.exports = memo;