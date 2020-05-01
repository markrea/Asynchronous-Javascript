const request = require('supertest');
const app = require('../src/app');

it('GET / should respond with a welcome message', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my jokes API!');
      done();
    });
});

it('GET / should respond with a message describing the endpoint', done => {
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the all jokes endpoint');
      done();
    });
});
it('GET / should repsond with a message describing the endpoint', done => {
  request(app)
    .get('/joke/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the random joke endpoint');
      done();
    });
});
it('GET / should respond with a message describing the endpoint', done => {
  request(app)
    .get('/joke/random/personal/:first/:last')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('This is the personal joke endpoint');
      done();
    });
});
