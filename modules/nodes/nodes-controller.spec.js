var request = require('supertest');
var should = require('should');
var app = require('../../bin/www').app;
var NodeService = require('./nodes-service');


describe('Node-->NodeController', function () {
    describe('#findAll', function () {
        it('should return a list of nodes given the url /api/v1/nodes/', function (done) {
            request(app)
                    .get('/api/v1/nodes/')
                    .expect(200)
                    .end(function (err, res) {
                        try {
                            should.not.exist(err);
                            res.body.length.should.be.aboveOrEqual(5);
                        } catch (err) {
                            if (err) throw err;
                        }

                        done();
                    });
        });
    });

    describe('#findOne', function () {
        it('should return a node given the url /api/v1/nodes/', function (done) {
            var id = new String("54f6612bb0e6af1800b5d00C").toLowerCase();

            request(app)
                    .get('/api/v1/nodes/'+id)
                    .expect(200)
                    .end(function (err, res) {
                        try {
                            should.not.exist(err);
                            res.body.name.should.be.equal("C");
                        } catch (err) {
                            if (err) throw err;
                        }
                        done();
                    });
        });
    });
    
    describe('#findOne', function () {
        it('should return not found', function (done) {
            var id = new String("fffff12bb0e6af1800b5d00C").toLowerCase();

            request(app)
                    .get('/api/v1/nodes/'+id)
                    .expect(404)
                    .end(function (err, res) {
                        try {
                            should.not.exist(err);
                        } catch (err) {
                            if (err) throw err;
                        }
                        done();
                    });
        });
    });

});


