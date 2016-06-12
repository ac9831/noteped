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

module.exports = router;
