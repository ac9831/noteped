var supertest = require("supertest");
var express = require('express');

var server = supertest.agent("http://localhost:3000");


describe("memoRoute",function(){

    var id = 0;

    it("memoAdd /",function(done) {

        server.post('/memo/')
            .send({title : "test",content:"testMemo", createdAt : Date.now(), updatedAt : Date.now()})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                id = res.body.id;
                done();
            });
    });

    it("memoUpdate /upd",function(done) {

        server.post('/memo/upd')
            .send({id: id, title : "update", content:"updateMemo",createdAt : Date.now(), updatedAt : Date.now()})
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                done();
            });
    });

    it("memo /id",function(done) {

        server.get('/memo/'+id)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                done();
            });
    });

    it("memo All",function(done) {

        server.get('/memo/all')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                done();
            });
    });

    it("memoDel /del/:id",function(done) {

        server.delete('/memo/del/'+id)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err,res) {
                id = res.body.id;
                done();
            });
    });


});

