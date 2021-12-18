const { client } = require('../helpers');
const { csrfTokens } = require('../helpers/csrftoken');

const csrf = (req, res, next) => {
  const tokens = csrfTokens;
  const token = req.headers['x-csrf-token'] || req.body['x-csrf-token'];

  // if the csrf token is not sended or the token sended is not in the object of csrfTokens. Will return a 403 status with a message
  if (!token || tokens[req.userId] !== token) {
    return res.status(403).send('csrf token not valid or expired');
  }

  // if the token is valid, next, and the csrf token will be deleted
  next();
  delete tokens[req.userId];
  client.set('csrf_tokens', JSON.stringify(tokens));
};

module.exports = csrf;
