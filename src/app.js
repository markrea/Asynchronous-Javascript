const express = require('express');
const {
  mainController,
  jokesController,
  randomController,
  personalController,
} = require('./controllers');

const app = express();
app.use(express.static('public'));

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomController);

app.get('/jokes/random/personal/:first/:last', personalController);

module.exports = app;
