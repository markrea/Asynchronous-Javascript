const express = require('express');
const {
  mainController,
  jokesController,
  randomController,
  personalController,
} = require('./controllers');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/joke/random', randomController);

app.get('/joke/random/personal/:first/:last', personalController);

module.exports = app;
