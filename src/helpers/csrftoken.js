const client = require('./redis');
const { v4: uuid } = require('uuid');
const { CSRF_TOKEN_EXPIRES_IN } = require('../config');

let csrfTokens = {};

//if already exists tokens in redis, return the tokens
client.get('csrf_tokens', (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    csrfTokens = JSON.parse(reply);
  }
});

const csrfToken = (userId) => {
  //create a new token
  const token = uuid();

  //We store the token in redis with the user id as key
  csrfTokens[userId] = token;
  client.set('csrf_tokens', JSON.stringify(csrfTokens));

  //we get the token from the object csrfTokens and update it in redis
  setTimeout(() => {
    delete csrfTokens[userId];
    client.set('csrf_tokens', JSON.stringify(csrfTokens));
  }, CSRF_TOKEN_EXPIRES_IN);

  return token;
};

module.exports = { csrfToken, csrfTokens };
