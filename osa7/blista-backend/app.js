const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');
const BlogsRouter = require('./controllers/blogs');
const UsersRouter = require('./controllers/users');
const LoginRouter = require('./controllers/login');
const ResetRouter = require('./controllers/reset');
const Config = require('./utils/config');
const Middleware = require('./utils/middleware');

try {
  mongoose.connect(Config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
} catch(err) {
  console.log(err);
  process.exit(-1);
}


app.use(Cors());
app.use(BodyParser.json());
app.use(Middleware.tokenExtractor);

app.use('/api/blogs', BlogsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/login', LoginRouter);

if(process.env.NODE_ENV === 'test') {
  app.use('/api', ResetRouter);
}

app.use(Middleware.unknownEndpoint);
app.use(Middleware.errorHandler);

module.exports = app;
