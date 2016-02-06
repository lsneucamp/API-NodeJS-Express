var request = require('supertest');
var should = require('should');
var app = require('../../bin/www').app;
var NodeService = require('./nodes-service');


describe('Node-->NodeService', function () {
    describe('#findAll', function () {
        it('should return all preset nodes or more', function (done) {

            NodeService
                    .findAll().then(function (docs) {
                try {
                    should
                            .exist(docs);

                    docs
                            .should
                            .be
                            .instanceOf(Array);

                    should(docs.length)
                            .aboveOrEqual(5);
                } catch (err) {
                    if (err) throw err;
                }
                done();
            });


        });
    });

    describe('#findOne', function () {
        it('should return a single document of Node.name "C"', function (done) {
            var id = new String("54f6612bb0e6af1800b5d00C").toLowerCase();

            NodeService
                    .findOne(id).then(function (doc) {
                try {
                    should
                            .exist(doc);
                    should(doc._id.toString()).be.equal(id);
                    should(doc.name).be.equal("C");
                } catch (err) {
                    if (err) throw err;
                }
                done();
            });


        });
    });

    describe('#findOne', function () {
        it('should return a single document of Node.name "B"', function (done) {
            var id = new String("54f6612bb0e6af1800b5d00b").toLowerCase();

            NodeService
                    .findOne(id).then(function (doc) {
                try {
                    should
                            .exist(doc);
                    should(doc._id.toString()).be.equal(id);
                    should(doc.name).be.equal("B");
                } catch (err) {
                    if (err) throw err;
                }
                done();
            });


        });
    });




});
