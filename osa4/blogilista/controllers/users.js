const usersRouter = require('express').Router();
const User = require('../models/user.js');
const BCrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const result =  await User
    .find({})
    .populate('blogs', { title:1, author:1, url:1, likes:1 });
  response.json(result);
});

usersRouter.post('/', async (req, res, next) => {
  try {
    if(!req.body.password || req.body.password.length<3) {
      return res.status(400).send({ error: 'password missing or shorten than 3 characters' });
    }

    const userData = {
      username: req.body.username,
      name: req.body.name,
      password: await BCrypt.hash(req.body.password, 10)
    };

    const user = new User(userData);
    const result = await user.save();
    res.status(201).json(result);
  } catch(err) {
    next(err);
  }
});

module.exports = usersRouter;