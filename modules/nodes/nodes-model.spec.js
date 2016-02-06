var request = require('supertest');
var should = require('should');
var app = require('../../bin/www').app;
var Node = require('./nodes-model');


describe('Node-->NodeModel', function () {
    describe('#findAll', function () {
        it('should return all preset nodes or more', function (done) {

            Node
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
        it('should return a single document of Node.name "C"', function (done) {
            var id = new String("54f6612bb0e6af1800b5d00C").toLowerCase();

            Node
                    .findOne({_id: id}, function (err, doc) {
                        try {


                            should
                                    .not
                                    .exist(err);
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



});
