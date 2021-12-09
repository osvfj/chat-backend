const { request, response } = require('express');
const User = require('../models/User');

const login = async (req = request, res = response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'The user does not exist' });
    }
    if (!user.comparePassword(password)) {
      return res.status(401).json({ msg: 'The password is incorrect' });
    }
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

const register = async (req = request, res = response) => {
  const { name, email, username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'The user already exists' });
    }
    const newUser = new User({ name, email, username, password });
    await newUser.save();
    res.json({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  login,
  register,
};
