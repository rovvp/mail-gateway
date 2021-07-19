var app = require('../app'),
    request = require('supertest'), 
    expect  = require('chai').expect,
    config  = require('config');

describe('Testing API Endpoint (POST /)', function () {

     //increase the timeout as mail api is sometimes slow
    this.timeout(10000); 

	it('Responds with 200 status and JSON', function(done) {

      request(app)
      .post('/')
      .send({ 
      	 addressTo: 'rowan.pronk@icloud.com',
      	 content: 'this is a test'
       })
      .expect('Content-Type', /json/)
      .expect(200, done);

	});


    it('Responds with 404 when trying to get', function(done) {

        request(app)
        .get('/')
        .expect(404, done);
  
    });
  
  
    it('Responds with 404 when trying to put', function(done) {
  
        request(app)
        .get('/')
        .expect(404, done);
  
    });
  
  
    it('Responds with 404 when trying to delete', function(done) {
  
        request(app)
        .delete('/')
        .expect(404, done);
  
    });



});