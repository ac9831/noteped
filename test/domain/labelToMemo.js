var sequelize = require('Sequelize');
var config = require('../../config/sequelize_config');
var label = require('../../domain/label');
var memo = require('../../domain/memo');


describe('labelToMemo',function() {

    describe('#labelToMemo', function () {
        it('labelToMemo DB 테스트', function () {
            var labelToMemo = config.define('label_to_memo', {

                labelId: {type: sequelize.INTEGER, allowNull: false},
                memoId: {type: sequelize.INTEGER, allowNull: false}
            }, {
                createdAt: false,
                updatedAt: false
            });

            labelToMemo.belongsTo(label, {foreignKey: 'labelId', targetKey: 'id'});
            label.hasMany(labelToMemo, {foreignKey: 'labelId'});

            labelToMemo.belongsTo(memo, {foreignKey: 'memoId', targetKey: 'id'});
            memo.hasMany(labelToMemo, {foreignKey: 'memoId'});


            labelToMemo.sync();
        })
    });

})
