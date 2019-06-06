const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');
const BlogsRouter = require('./controllers/blogs');
const UsersRouter = require('./controllers/users');
const LoginRouter = require('./controllers/login');
const Config = require('./utils/config');
const Middleware = require('./utils/middleware');

mongoose.connect(Config.DB_URL, { useNewUrlParser: true });

app.use(Cors());
app.use(BodyParser.json());
app.use(Middleware.tokenExtractor);

app.use('/api/blogs', BlogsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/login', LoginRouter);

app.use(Middleware.unknownEndpoint);
app.use(Middleware.errorHandler);

module.exports = app;