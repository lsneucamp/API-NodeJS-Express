var request = require('supertest');
var should = require('should');
var app = require('../../bin/www').app;
var EdgeService = require('./edges-service');


describe('Node-->EdgeController', function () {
    describe('#findAll', function () {
        it('should return a list of edges given the url /api/v1/edges/', function (done) {
            request(app)
                    .get('/api/v1/edges/')
                    .end(function (err, res) {
                        try {
                            should.not.exist(err);
                            res.status.should.be.equal(200);
                            res.body.length.should.be.aboveOrEqual(5);
                        } catch (err) {
                            if (err)
                                throw err;
                        }

                        done();
                    });
        });
    });

    describe('#findOne', function () {
        it('should return a edges given the url /api/v1/edges/:id', function (done) {
            var id = new String("54f6612bb0e6af1800b5d00C").toLowerCase();

            request(app)
                    .get('/api/v1/nodes/' + id)
                    .expect(200)
                    .end(function (err, res) {
                        try {
                            should.not.exist(err);
                            res.status.should.be.equal(200);
                            res.body.name.should.be.equal("C");
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

    describe('#findOne', function () {
        it('should return not found given the url /api/v1/edges/:id{invalid_id}', function (done) {
            var id = new String("fffff12bb0e6af1800b5d00C").toLowerCase();

            request(app)
                    .get('/api/v1/nodes/' + id)
                    .expect(404)
                    .end(function (err, res) {
                        try {
                            res.status.should.be.equal(404);
                            should.not.exist(err);
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

    describe('#walker', function () {
        it('should return a list of all possible paths given the \n\
/api/v1/edges/?paths=all&sourceNodeId={sourceNodeId}&destNodeId={destNodeId}&autonomy={autonomy}&fuelCost={fuelCost}', function (done) {
            request(app)
                    .get('/api/v1/edges/?paths=all&sourceNodeId=54f6612bb0e6af1800b5d00A&destNodeId=54f6612bb0e6af1800b5d00E&autonomy=10&fuelCost=3,5')
                    .end(function (err, res) {
                        try {
                            console.log(res.body);
                            res.status.should.be.equal(200);
                            res.body.should.be.instanceOf(Array);
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

    describe('#walker', function () {
        it('should return best paths given the \n\
/api/v1/edges/?paths=best&sourceNodeId=54f6612bb0e6af1800b5d00A&destNodeId=54f6612bb0e6af1800b5d00E', function (done) {
            request(app)
                    .get('/api/v1/edges/?paths=best&sourceNodeId=54f6612bb0e6af1800b5d00A&destNodeId=54f6612bb0e6af1800b5d00E')
                    .end(function (err, res) {
                        try {
                            res.status.should.be.equal(200);
                            res.body.should.be.instanceOf(Array);
                            res.body[0].distance.should.be.equal(55);
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

    describe('#walker', function () {
        it('should return worst paths given the \n\
/api/v1/edges/?paths=worst&sourceNodeId=54f6612bb0e6af1800b5d00A&destNodeId=54f6612bb0e6af1800b5d00E', function (done) {
            request(app)
                    .get('/api/v1/edges/?paths=worst&sourceNodeId=54f6612bb0e6af1800b5d00A&destNodeId=54f6612bb0e6af1800b5d00E')
                    .end(function (err, res) {
                        try {
                            res.status.should.be.equal(200);
                            res.body.should.be.instanceOf(Array);
                            res.body[0].distance.should.be.equal(80);
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

    describe('#walker', function () {
        it('should return an bad request given the /api/v1/edges/?paths=all', function (done) {
            request(app)
                    .get('/api/v1/edges/?paths=all')
                    .expect(400)
                    .end(function (err, res) {
                        try {
                            res.status.should.be.equal(400);
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

    describe('#walker', function () {
        it('should return an bad request given /api/v1/edges/?paths=none', function (done) {
            request(app)
                    .get('/api/v1/edges/?paths=none')
                    .end(function (err, res) {
                        try {
                            res.status.should.be.equal(400);
                        } catch (err) {
                            if (err)
                                throw err;
                        }
                        done();
                    });
        });
    });

});


