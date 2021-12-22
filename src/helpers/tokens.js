const jwt = require('jsonwebtoken');
const client = require('./redis');
const {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_REDIS_EXPIRES_IN,
  REFRESH_REDIS_EXPIRES_IN,
} = require('../config');

const createTokens = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = jwt.sign({ id }, JWT_ACCESS_TOKEN, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
      });
      const refreshToken = jwt.sign({ id }, JWT_REFRESH_TOKEN, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
      });

      // save the refresh token in the redis
      const acct = ACCESS_REDIS_EXPIRES_IN;
      client.setEx(`access:${id}`, acct, accessToken);

      // save the refresh token in redis
      const rft = REFRESH_REDIS_EXPIRES_IN;
      client.setEx(`refresh:${id.toString()}`, rft, refreshToken);

      resolve({ accessToken, refreshToken });
    } catch (error) {
      reject({
        status: 500,
        message: 'Error while generating access token',
      });
    }
  });
};

const verifyToken = (token, secret) => {
  return new Promise(async (resolve, reject) => {
    try {
      // we verify if is a refresh token
      if (secret === JWT_REFRESH_TOKEN) {
        const decoded = jwt.verify(token, secret);
        const reply = await client.get(`refresh:${decoded.id}`);

        //if the refresh token sended is not the same as the one in the redis
        if (reply !== token) {
          return reject({
            status: 401,
            message: 'Invalid refresh token, nice try',
          });
        }

        return resolve(decoded);
      }

      const decoded = jwt.verify(token, secret);
      const reply = await client.get(`access:${decoded.id}`);

      //if the access token sended is not the same as the one in the redis
      if (reply !== token) {
        return reject({
          status: 401,
          message: 'Invalid access token, nice try',
        });
      }

      return resolve(decoded);
    } catch (error) {
      error.message === 'jwt expired'
        ? reject({
            status: 401,
            message: 'Token expired',
          })
        : reject({
            status: 500,
            message: 'Token is invalid',
          });
    }
  });
};

module.exports = {
  createTokens,
  verifyToken,
};
