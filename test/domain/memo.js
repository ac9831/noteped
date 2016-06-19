var sequelize = require('Sequelize');
var config = require('../../config/sequelize_config');

describe('memo',function(){

    describe('#memoDB',function(){
        it('memo DB 테스트', function () {
            var memo = config.define('memo',{

                title : sequelize.STRING,
                content : sequelize.TEXT,
                createdate : sequelize.DATE,
                labelid : sequelize.INTEGER
            });

            memo.sync();

        });
    });
})
