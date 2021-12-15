const { createClient } = require('redis');
const { REDIS_URI, REDIS_PASSWORD } = require('../config');

const client = createClient({
  url: REDIS_URI,
  password: REDIS_PASSWORD,
});
client
  .connect()
  .then(() => console.log('Redis connected'))
  .catch((err) => console.log(err));

module.exports = client;
