const Jwt = require('jsonwebtoken');
const BCrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, rsp) => {
  const user = await User.findOne({ username: req.body.username });
  const passwordCorrect = user === null ? false : await BCrypt.compare(req.body.password, user.password);

  if (!(user && passwordCorrect)) {
    return rsp.status(401).json({
      error: 'invalid username or password'
    });
  }

  const token = Jwt.sign({
    username: user.username,
    id: user._id,
  }, process.env.SECRET);

  rsp
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;