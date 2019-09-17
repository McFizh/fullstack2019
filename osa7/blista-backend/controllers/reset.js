const resetRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

resetRouter.post('/reset', async (req, rsp) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  rsp.status(204).end();
});

module.exports = resetRouter;