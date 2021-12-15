const { request, response } = require('express');
const User = require('../models/User');
const { cloudinary } = require('../helpers');
const { logout } = require('./auth.controller');

const getUsers = async (req = request, res = response) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const users = await User.paginate({}, { page, limit });
  res.json(users);
};

const getUser = async (req = request, res = response) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.json(user);
};

const updateUser = async (req = request, res = response) => {
  const id = req.userId;
  const { name, email, username, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        username,
        password,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let userImageUpdated;
    if (req.files) {
      const { tempFilePath } = req.files.avatar;
      const [_, avatarUploaded] = await Promise.all([
        await cloudinary.uploader.destroy(user.avatar.public_id),
        await cloudinary.uploader.upload(tempFilePath, {
          upload_preset: 'profile-pictures',
        }),
      ]);

      userImageUpdated = await User.findByIdAndUpdate(
        id,
        {
          avatar: {
            url: avatarUploaded.url,
            public_id: avatarUploaded.public_id,
          },
        },
        { new: true }
      );
    }

    userImageUpdated == true
      ? res.json({ msg: 'User and image updated', userImageUpdated })
      : res.json({ msg: 'User updated', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteUser = async (req = request, res = response) => {
  const userId = req.userId;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  logout(req, res, {
    msg: 'User deleted',
    user,
  });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
