const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

blogsRouter.get('/', async (request, response) => {
  const result =  await Blog
    .find({})
    .populate('user',{ username: 1, name:1 });
  response.json(result);
});

blogsRouter.post('/', async (request, response, next) => {
  const blogData = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  };

  const user = await User.findOne({});
  blogData.user = user._id;

  try {
    const blog = new Blog(blogData);
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch(err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findOne({ _id: request.params.id });
    if(!blog) {
      response.status(404).json({ error: 'blog not found' });
    }

    await blog.deleteOne({ _id: request.params.id });

    const user = await User.findOne({ _id: blog.user });
    if(user) {
      user.blogs = user.blogs.filter( b => {
        return String(b) !== String(request.params.id);
      });
      await user.save();
    }

    response.status(204).end();
  } catch(err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findOne({ _id: request.params.id });
    if(!blog) {
      response.status(404).json({ error: 'blog not found' });
    }

    blog.likes = request.body.likes || 0;

    const updBlog = await blog.save();
    response.json(updBlog);
  } catch(err) {
    next(err);
  }
});

module.exports = blogsRouter;