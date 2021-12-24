const cloudinary = require('./cloudinary');
const {
  usernameDoesNotExist,
  usernameAlreadyExists,
  emailAlreadyExists,
  userNotFound,
} = require('./db-validation');
const { createTokens, verifyToken } = require('./tokens');
const client = require('./redis');
const csrfToken = require('./csrftoken');
const { sendEmail, getTemplate } = require('./mailer');

module.exports = {
  cloudinary,
  usernameDoesNotExist,
  usernameAlreadyExists,
  emailAlreadyExists,
  userNotFound,
  createTokens,
  verifyToken,
  client,
  csrfToken,
  sendEmail,
  getTemplate,
};
