// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('request');

const mainController = (req, res) =>
  res.send({
    message: 'Welcome to my jokes API!',
  });

const jokesController = (req, res) =>
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }
    const parsedResponse = JSON.parse(jokesApiResponse.body);

    res.send({ jokes: parsedResponse.value });
  });

const randomController = (req, res) =>
  res.send({
    message: 'This is the random joke endpoint',
  });

const personalController = (req, res) =>
  res.send({
    message: 'This is the personal joke endpoint',
  });

module.exports = {
  mainController,
  jokesController,
  randomController,
  personalController,
};
