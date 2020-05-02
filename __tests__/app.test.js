/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const { mockJokeList } = require('../data/test-data');

describe('GET / - Homepage', () => {
  it('should respond with some homepage markup', async () => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Hello, Welcome to my jokes API!');
      });
  });
});
describe('GET /jokes', () => {
  it('GET / should respond with a list of jokes', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockJokeList);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(mockJokeList.value);
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
      });
  });
});
describe('GET /jokes/random', () => {
  it('GET / should respond with a random joke', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual({
          categories: [],
          id: 115,
          joke: 'i am a random joke',
        });
        done();
      })
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Unknown resource' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Unknown resource');
        done();
      });
  });
});
describe('GET /jokes/random/personal', () => {
  it('GET / should respond with a personal joke', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 141,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.value);
      });
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 500, message: 'Bad request' });

    request(app)
      .get('jokes/random/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('Bad request');
      });
  });
});
