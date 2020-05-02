const express = require('express');
const { jokesController, randomController, personalController } = require('./controllers');

const app = express();

app.use(express.static('public'));

app.get('/jokes', jokesController);

app.get('/jokes/random', randomController);

app.get('/jokes/random/:first/:last', personalController);

module.exports = app;
