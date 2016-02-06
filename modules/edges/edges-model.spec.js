var request = require('supertest');
var should = require('should');
var app = require('../../bin/www').app;
var Edge = require('./edges-model');


describe('Edge-EdgeModel', function () {
    describe('#findAll', function () {
        it('should return all preset edges or more', function (done) {

            Edge
                    .find({}, function (err, docs) {
                        try {

                            should
                                    .not
                                    .exist(err);

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
        it('should return a single document of Edge (A --> B)', function (done) {
            var id = new String("54f6612bb0e6af1800b5dE0A").toLowerCase();

            Edge
                    .findOne({_id: id})
                    .populate("nodeA")
                    .populate("nodeB")
                    .exec(function (err, doc) {
                        try {

                            should
                                    .not
                                    .exist(err);
                            should
                                    .exist(doc);
                            should(doc._id.toString()).be.equal(id);

                            should(doc.nodeA.name).be.equal("A");

                            should(doc.nodeB.name).be.equal("B");

                        } catch (err) {
                            if (err) throw err;
                        }

                        done();
                    });


        });
    });

    describe('#findOne', function () {
        it('should return a single document of Edge (B --> D)', function (done) {
            var id = new String("54f6612bb0e6af1800b5dE0B").toLowerCase();

            Edge
                    .findOne({_id: id})
                    .populate("nodeA")
                    .populate("nodeB")
                    .exec(function (err, doc) {
                        try {
                            should
                                    .not
                                    .exist(err);
                            should
                                    .exist(doc);
                            should(doc._id.toString()).be.equal(id);

                            should(doc.nodeA.name).be.equal("B");

                            should(doc.nodeB.name).be.equal("D");

                        } catch (err) {
                            if (err) throw err;
                        }

                        done();
                    });


        });
    });



});
