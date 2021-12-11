const jwt = require('jsonwebtoken');
const {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = require('../config');

const createTokens = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const accessToken = jwt.sign({ id }, JWT_ACCESS_TOKEN, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
      });
      const refreshToken = jwt.sign({ id }, JWT_REFRESH_TOKEN, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
      });

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
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, secret);
      resolve(decoded);
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
