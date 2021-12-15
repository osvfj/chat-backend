const { client } = require('../helpers');
const { csrfTokens } = require('../helpers/csrftoken');

const csrf = (req, res, next) => {
  const tokens = csrfTokens;
  const token = req.headers['x-csrf-token'] || req.body['x-csrf-token'];

  if (!token || tokens[req.userId] !== token) {
    return res.status(403).send('csrf token not valid or expired');
  }

  next();
  delete tokens[req.userId];
  client.set('csrf_tokens', JSON.stringify(tokens));
};

module.exports = csrf;
