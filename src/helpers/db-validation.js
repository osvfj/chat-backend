const User = require('../models/User');

const usernameAlreadyExists = async (username = '') => {
  const user = await User.findOne({ username });
  if (user) {
    throw new Error('The username already exists');
  }
};

const usernameDoesNotExist = async (username = '') => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('The username does not exist');
  }
};

const userNotFound = async (userId = '') => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
};

const emailAlreadyExists = async (email = '') => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error('The email already exists');
  }
};

module.exports = {
  usernameAlreadyExists,
  emailAlreadyExists,
  usernameDoesNotExist,
  userNotFound,
};
