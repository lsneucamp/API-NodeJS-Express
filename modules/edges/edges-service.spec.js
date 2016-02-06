var q = require('q');

var request = require('supertest');
var should = require('should');
var app = require('../../bin/www').app;
var EdgeService = require('./edges-service');
var NodeService = require('../nodes/nodes-service');


describe('Egde-->EdgeService', function () {
    describe('#findAll', function () {
        it('should return all preset edges or more', function (done) {

            EdgeService
                    .findAll()
                    .then(function (docs) {
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

                    }, function (err) {
                        should
                                .not
                                .exist(err);
                    });

        });
    });

    describe('#findOne', function () {
        it('should return a single document of Edge (A --> B)', function (done) {
            var id = new String("54f6612bb0e6af1800b5dE0A").toLowerCase();

            EdgeService
                    .findOne(id)
                    .then(function (doc) {
                        try {
                            should
                                    .exist(doc);
                            should(doc._id.toString()).be.equal(id);
                            doc.nodeA.name.should.be.equal("A");
                            doc.nodeB.name.should.be.equal("B");

                        } catch (err) {
                            if (err) throw err;
                        }

                        done();

                    }, function (err) {
                        should
                                .not
                                .exist(err);
                        done();
                    });


        });
    });

    describe('#findOne', function () {
        it('should return a single document of Edge (C --> D)', function (done) {
            var id = new String("54f6612bb0e6af1800b5dE0D").toLowerCase();

            EdgeService
                    .findOne(id)
                    .then(function (doc) {
                        try {
                            should
                                    .exist(doc);
                            should(doc._id.toString()).be.equal(id);
                            doc.nodeA.name.should.be.equal("C");
                            doc.nodeB.name.should.be.equal("D");

                        } catch (err) {
                            if (err) throw err;
                        }

                        done();

                    }, function (err) {
                        should
                                .not
                                .exist(err);
                        done();
                    });


        });
    });

    describe('#findOne', function () {
        it('should return null for not-found document', function (done) {
            var id = new String("THISDOCUMENTDOESNOTEXIST").toLowerCase();

            EdgeService
                    .findOne(id)
                    .then(function (doc) {
                        try {
                            should
                                    .not.exist(doc);

                        } catch (err) {
                            if (err) throw err;
                        }

                        done();

                    }, function (err) {
                        should
                                .not
                                .exist(err);
                        done();
                    });


        });
    });

    describe('#findByNodeA', function () {
        it('should return list of edges by specified node id', function (done) {
            var id = new String("54f6612bb0e6af1800b5d00b").toLowerCase();

            EdgeService
                    .findByNodeA(id)
                    .then(function (docs) {
                        try {
                            should.exist(docs);
                            docs.should.be.instanceOf(Array);
                            should.exist(docs.length);
                            should(docs.length).be.aboveOrEqual(2);
                            done();
                        } catch (err) {
                            if (err) throw err;
                        }
                    }, function (err) {
                        should.not.exist(err);
                        done();
                    });




        });
    });

    describe('#walker', function () {
        it('should return list of all possible paths', function (done) {
            var sourceNodeId = new String("54f6612bb0e6af1800b5d00a").toLowerCase();
            var destNodeId = new String("54f6612bb0e6af1800b5d00e").toLowerCase();

            var sourceNode;
            var destNode;

            NodeService
                    .findOne(sourceNodeId)
                    .then(function (doc) {
                        sourceNode = doc;
                        return q();
                    })
                    .then(
                            function () {
                                return  NodeService
                                        .findOne(destNodeId);
                            }
                    )
                    .then(function (doc) {
                        destNode = doc;
                        return q();
                    })
                    .then(function () {
                        return EdgeService
                                .walker(sourceNode, destNode);
                    })
                    .then(function (paths) {
                        try {
                            should.exist(paths);
                            paths.should.be.instanceOf(Array);
                            paths.length.should.be.aboveOrEqual(3);
                        } catch (err) {
                            if (err) throw err;
                        }
                        done();
                    }, function (err) {
                        try {
                            console.log(err);
                            should.exist(err);
                        } catch (err) {
                            if (err) throw err;
                        }
                        done();
                    });
        });
    });

    describe('#walker', function () {
        it('should return an error due NodeA is equal NodeB', function (done) {
            var sourceNodeId = new String("54f6612bb0e6af1800b5d00a").toLowerCase();
            var destNodeId = new String("54f6612bb0e6af1800b5d00e").toLowerCase();

            var sourceNode;
            var destNode;

            NodeService
                    .findOne(sourceNodeId)
                    .then(function (doc) {
                        sourceNode = doc;
                        return q();
                    })
                    .then(function () {
                        return EdgeService
                                .walker(sourceNode, sourceNode);
                    })
                    .then(function (paths) {
                        try {
                            should.not.exist(paths);
                        } catch (err) {
                            if (err) throw err;
                        }
                        done();
                    }, function (err) {
                        try {
                            should.exist(err);
                        } catch (err) {
                            if (err) throw err;
                        }
                        done();
                    });
        });
    });







});
