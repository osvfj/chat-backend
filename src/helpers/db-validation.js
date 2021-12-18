const User = require('../models/User');

//all of these validations are used in the custom method on all the schemas for validaton with express-validator

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

const userNotFound = async (id, username) => {
  if (!username === 0) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
  }
  if (!id === 0) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
  }

  return;
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
