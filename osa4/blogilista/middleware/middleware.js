// Auth token
const tokenExtractor = (req, res, next) => {
  const authHeader = req.get('authorization');

  if(authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    req.token = authHeader.substring(7);
  } else {
    req.token = null;
  }

  next();
};

// Virhekäsittelijä
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if(err.name === 'ValidationError' ) {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  } else {
    console.log(err);
  }

  next(err);
};

module.exports = {
  tokenExtractor,
  errorHandler
};