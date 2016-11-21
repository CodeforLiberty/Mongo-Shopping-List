global.DATABASE_URL = 'mongodb://Dev:Dev@ds159527.mlab.com:59527/shooping-list';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
  before(function(done) {
    server.runServer(function() {
      Item.create({name: 'Broad beans'},
      {name: 'Tomatoes'},
      {name: 'Peppers'}, function() {
        done();
      });
    });
  });
  it('should return an array of objects on GET', function(done) {
    chai.request(app)
    .get('/items')
    .end(function(err, res) {
      console.log(res.body);
      should.equal(err, null);
      res.should.have.status(200);
      res.should.be.json;
      // res.body.should.be.a('array');
      // res.body.should.have.all.keys('name', 'id');
      // res.body[0].should.be.an('object');
      // res.body[0].name.should.be.a('string');
      // res.body[0].id.should.be.a('number');
      // res.body[0].name.should.equal('Broad beans');
      // res.body[1].name.should.equal('Tomatoes');
      // res.body[2].name.should.equal('Peppers');
      done();
    });
  });


  after(function(done) {
    Item.remove(function() {
      done();
    });
  });
});
