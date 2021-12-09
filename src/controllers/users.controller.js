const { request, response } = require('express');
const User = require('../models/User');
const { cloudinary } = require('../helpers');

const getUsers = async (req = request, res = response) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
};

const getUser = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id, { password: 0 });

  res.json(user);
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, email, username, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      username,
      password,
    });

    res.json({ msg: 'User updated', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateAvatar = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { tempFilePath } = req.files.avatar;
    const avatarUploaded = await cloudinary.uploader.upload(tempFilePath);

    const user = await User.findByIdAndUpdate(id, {
      avatar: {
        url: avatarUploaded.url,
        public_id: avatarUploaded.public_id,
      },
    });

    res.json({ msg: 'Avatar updated', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id, { password: 0 });

  res.json({ msg: 'User deleted', user });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  deleteUser,
};
