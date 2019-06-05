const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');
const BlogsRouter = require('./controllers/blogs');
const Config = require('./utils/config');

mongoose.connect(Config.DB_URL, { useNewUrlParser: true });

app.use(Cors());
app.use(BodyParser.json());

app.use('/api/blogs', BlogsRouter);

// Virhekäsittelijä
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if(err.name === 'ValidationError' ) {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};
app.use(errorHandler);

module.exports = app;