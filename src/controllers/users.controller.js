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

    // this variable has the status if the user send an avatar
    let userImageUpdated;

    //verify if the user is trying to update the avatar, if it does will uploaded to cloudinary and save in the database
    if (req.files) {
      const { tempFilePath } = req.files.avatar; // get the temporal path of the image

      //delete the old avatar and upload the new one
      const [_, avatarUploaded] = await Promise.all([
        await cloudinary.uploader.destroy(user.avatar.public_id),
        await cloudinary.uploader.upload(tempFilePath, {
          upload_preset: 'profile-pictures',
        }),
      ]);

      //update the avatar of the user in the database
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

    //if the user updated a image or not, the server will response with the user updated, but with diferent messages
    userImageUpdated == true
      ? res.json({ msg: 'User and image updated', userImageUpdated })
      : res.json({ msg: 'User updated', user });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteUser = async (req = request, res = response) => {
  const userId = req.userId;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  //use the logout function to delete the cookies
  logout(req, res, {
    msg: 'User deleted',
    user,
  });
};

const me = async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json({ msg: 'user is logged in', user });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  me,
};
