const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const result =  await Blog.find({});
  response.json(result);
});

blogsRouter.post('/', async (request, response, next) => {
  const blogData = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  };

  try {
    const blog = new Blog(blogData);
    const result = await blog.save();
    response.status(201).json(result);
  } catch(err) {
    next(err);
  }
});

module.exports = blogsRouter;