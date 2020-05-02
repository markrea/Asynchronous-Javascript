const axios = require('axios');

const jokesController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes')
    .then(response => {
      res.send({ jokes: response.data.value });
    })
    .catch(error => {
      res.status(error.statusCode).send({ error: error.message });
    });

const randomController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      res.status(error.statusCode).send({ error: error.message });
    });

const personalController = async (req, res) => {
  const { first, last } = req.params;

  return axios
    .get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    )

    .then(response => {
      res.send({ personalJoke: response.data.value });
    })
    .catch(error => res.status(error.statusCode).send({ error: error.message }));
};

module.exports = {
  jokesController,
  randomController,
  personalController,
};
