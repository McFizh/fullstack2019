const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Cors = require('cors');
const mongoose = require('mongoose');
const BlogsRouter = require('./controllers/blogs');
const Config = require('./utils/config');

mongoose.connect(Config.DBURL, { useNewUrlParser: true });

app.use(Cors());
app.use(BodyParser.json());

app.use('/api/blogs', BlogsRouter);

app.listen(Config.PORT, () => {
  console.log(`Server running on port ${Config.PORT}`);
});