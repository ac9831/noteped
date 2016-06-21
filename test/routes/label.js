var supertest = require("supertest");
var express = require('express');

var server = supertest.agent("http://localhost:3000");


describe("labelRoute",function(){

    var id = 0;

    it("labelAdd /",function(done) {

        server.post('/label/')
            .send({title : "test", createdAt : Date.now(), updatedAt : Date.now()})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                id = res.body.id;
                done();
            });
    });

    it("labelUpdate /upd",function(done) {

        server.post('/label/upd')
            .send({id: id, title : "update", createdAt : Date.now(), updatedAt : Date.now()})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                done();
            });
    });

    it("label /id",function(done) {

        server.get('/label/'+id)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                done();
            });
    });

    it("label All",function(done) {

        server.get('/label/all')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                done();
            });
    });

    it("labelDel /del/:id",function(done) {

        server.delete('/label/del/'+id)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                id = res.body.id;
                done();
            });
    });


});

