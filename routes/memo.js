var express = require('express');
var memo = require('../domain/memo');
var labelToMemo = require('../domain/labelToMemo');

var router = express.Router();

router.get('/all', function(req,res){

    memo.findAll().then(function(data){

        res.json(data);

    })
        .catch(function(){

            res.sendStatus(503);

        });

});

router.get('/label/:labelid',function(req, res){

    var labelid = req.params.labelid;

    memo.findAll({
        where : {labelid : labelid}
    }).then(function(data){
        res.json(data);
    }).catch(function(e){

        res.sendStatus(503);
    });
})


router.get('/:id', function(req, res){

    var id = req.params.id;

    memo.findOne({
        where : {id : id}
    }).then(function(data){
        res.json(data);
    }).catch(function(e){

        res.sendStatus(503);
    })

})

router.post('/', function(req, res){

    var title = req.body.title;
    var content = req.body.content;
    var createdAt = Date.now();
    var updatedAt = Date.now();

    memo.create({
        title : title,
        content : content,
        createdAt : createdAt,
        updatedAt : updatedAt
    }).then(function(data){

        res.json(data);
    }).catch(function(e){

        res.sendStatus(503);
    });
});

router.post('/upd', function(req, res){

    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var updatedAt = Date.now();

    memo.update({
        title : title,
        content : content,
        updatedAt : updatedAt
    },{
        where : {id : id}
    }).then(function(data){

        res.json(data);
    }).catch(function(e){

        res.sendStatus(503);
    })

})

router.delete('/del/:id', function(req, res){

    var id = req.params.id;

    labelToMemo.destroy({
        where : {memoid : id}
    }).then(function(){
        memo.destroy({

            where : {id : id}
        }).then(function(){

            res.sendStatus(200);
        }).catch(function(e){

            res.sendStatus(503);
        });
    }).catch(function(e){
        res.sendStatus(503);
    })


});



module.exports = router;
