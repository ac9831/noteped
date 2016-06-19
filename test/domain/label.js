var sequelize = require('Sequelize');
var config = require('../../config/sequelize_config');

describe('label',function(){

    describe('#labelDB',function(){
        it('label DB 테스트', function () {
            var label = config.define('label',{
                title : sequelize.STRING,
                description : sequelize.STRING,
                createdate : sequelize.DATE
            });

            label.sync();

        });
    });
})
