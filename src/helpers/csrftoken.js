const client = require('./redis');
const { v4: uuid } = require('uuid');
const { CSRF_TOKEN_EXPIRES_IN } = require('../config');

const csrfToken = (userId) => {
  const token = uuid();

  client.set(`csrf:${userId}`, token, {
    EX: CSRF_TOKEN_EXPIRES_IN,
  });

  return token;
};

module.exports = csrfToken;
