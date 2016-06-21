var express = require('express');
var labelToMemo = require('../domain/labelToMemo');
var memo = require('../domain/memo');

var router = express.Router();

router.post('/add',function(req, res){

    var labelId = req.body.labelId;
    var memoId = req.body.memoId;

    labelToMemo.create({
        labelId : labelId,
        memoId : memoId
    }).then(function(data){

        res.json(data);
    }).catch(function(e){
        res.sendStatus(503);
    })
});

router.get('/memo/:memoid', function(req, res){

    var memoId = req.params.memoid;

    labelToMemo.findAll({
        where : {memoId : memoId}
    }).then(function(data){
        res.json(data)
    }).catch(function(e){
        res.sendStatus(503);
    })
});

router.get('/label/:labelid', function(req, res){

    var labelId = req.params.labelid;

    labelToMemo.findAll({
        where : {labelId : labelId},
        include : [memo],
        order: [
            ['memoId', 'DESC']
        ]
    }).then(function(data){
        res.json(data);
    }).catch(function(e){
        res.json(e);
    })

})

router.delete('/label/del/:labelid', function(req,res){

    var labelId = req.params.labelid;

    labelToMemo.destroy({
        where : {labelid : labelId}
    }).then(function(){

        res.sendStatus(200);
    }).catch(function(e){

        res.sendStatus(503);
    });
})

router.delete('/memo/del/:memoid', function(req,res){

    var memoId = req.params.memoid;

    labelToMemo.destroy({
        where : {memoId : memoId}
    }).then(function(){

        res.sendStatus(200);
    }).catch(function(e){

        res.sendStatus(503);
    });
})



module.exports = router;