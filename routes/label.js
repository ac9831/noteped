var express = require('express');
var label = require('../domain/label');

var router = express.Router();

router.get('/all', function(req,res){

  label.findAll().then(function(data){

    res.json(data);

  })
  .catch(function(){

    res.sendStatus(503);

  });

});

router.get('/:id',function (req,res) {

  var id = req.params.id;

  label.findOne({

    where : {id : id}
  }).then(function(data){

    res.json(data);

  }).catch(function(e){

    res.sendStatus(503);
  })


});

router.post('/', function(req,res){


  var title = req.body.title;

  label.create({

    title : title,
    createdAt : Date.now(),
    updatedAt : Date.now()

  }).then(function(data){

    res.json(data);

  })

});

router.post('/upd', function(req, res){

  var title = req.body.title;
  var id = req.body.id;

  label.update({
    title: title,
    updatedAt: Date.now()
  },{
    where : {id :id}
  }).then(function(data){
    res.json(data);
  })
})

router.delete('/del/:id', function(req,res){

  var id = req.params.id;

  label.destroy({
    where : {id : id}
  }).then(function(){

    res.sendStatus(200);

  }).catch(function(e){
    res.sendStatus(503);

  })

});

module.exports = router;
