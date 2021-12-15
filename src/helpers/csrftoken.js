const client = require('./redis');
const { v4: uuid } = require('uuid');

let csrfTokens = {};

client.get('csrf_tokens', (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    tokens = JSON.parse(reply);
  }
});

const csrfToken = (userId) => {
  const token = uuid();
  csrfTokens[userId] = token;
  client.set('csrf_tokens', JSON.stringify(csrfTokens));

  setTimeout(() => {
    delete csrfTokens[userId];
    client.set('csrf_tokens', JSON.stringify(csrfTokens));
  }, 1000 * 60 * 5);

  return token;
};

module.exports = { csrfToken, csrfTokens };
