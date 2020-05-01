const mainController = (req, res) =>
  res.send({
    message: 'Welcome to my jokes API!',
  });

const jokesController = (req, res) =>
  res.send({
    message: 'This is the all jokes endpoint',
  });

const randomController = (req,res) =>
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
