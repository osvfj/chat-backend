const { request, response } = require('express');
const { cloudinary } = require('../helpers');
const { createTokens, verifyToken, csrfToken } = require('../helpers');
const { client } = require('../helpers');

const User = require('../models/User');
const {
  JWT_REFRESH_TOKEN,
  COOKIE_ACCESS_NAME,
  COOKIE_REFRESH_NAME,
  COOKIES_OPTIONS,
} = require('../config');

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    //if the password is not the same as the one in the database return a message
    if (!user.comparePassword(password)) {
      return res.status(401).json({ msg: 'The password is incorrect' });
    }

    const { accessToken, refreshToken } = await createTokens(user._id);

    /*if the user and password are valid, the server will response with an access and refresh token */
    return res
      .cookie(COOKIE_ACCESS_NAME, accessToken, COOKIES_OPTIONS)
      .cookie(COOKIE_REFRESH_NAME, refreshToken, COOKIES_OPTIONS)
      .json({
        msg: 'user logged in',
        user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const register = async (req = request, res = response) => {
  const { name, email, username, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      username,
      password,
    });

    /* verify if the user is sending an avatar, if it does will uploaded to cloudinary and save in the database*/
    if (req.files) {
      const { tempFilePath } = req.files.avatar;
      const avatarUploaded = await cloudinary.uploader.upload(tempFilePath, {
        upload_preset: 'profile-pictures',
      });

      newUser.avatar = {
        url: avatarUploaded.url,
        public_id: avatarUploaded.public_id,
      };
    }

    await newUser.save();

    const { accessToken, refreshToken } = await createTokens(newUser._id);

    res
      .cookie(COOKIE_ACCESS_NAME, accessToken, COOKIES_OPTIONS)
      .cookie(COOKIE_REFRESH_NAME, refreshToken, COOKIES_OPTIONS)
      .json({ msg: 'user created', user: newUser, aceessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const logout = (req = request, res = response, cb) => {
  //the cb is extra parameter where you can send a custom response object, beacuse this function you can used anywhere to logout the user in the app.

  try {
    client.del(`access:${req.userId.toString()}`);
    client.del(`refresh:${req.userId.toString()}`);

    res
      .clearCookie(COOKIE_ACCESS_NAME)
      .clearCookie(COOKIE_REFRESH_NAME)
      .status(200)
      .json({ msg: 'Successfully logged out', cb });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const newToken = async (req = request, res = response) => {
  try {
    //recive the refresh token from the client
    const refresh =
      req.cookies[COOKIE_REFRESH_NAME] || req.headers['x-refresh-token'];
    //verify if the refresh token is valid
    const { id } = await verifyToken(refresh, JWT_REFRESH_TOKEN);

    //create a new access token and refresh token
    const { accessToken, refreshToken } = await createTokens(id);

    return res
      .cookie(COOKIE_ACCESS_NAME, accessToken, COOKIES_OPTIONS)
      .cookie(COOKIE_REFRESH_NAME, refreshToken, COOKIES_OPTIONS)
      .json({ accessToken, refreshToken });
  } catch (error) {
    res.status(error.status).json({ msg: error.message });
  }
};

const getCsrfToken = async (req = request, res = response) => {
  try {
    const token = csrfToken(req.userId);

    return res.json({ csrfToken: token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  login,
  register,
  logout,
  newToken,
  getCsrfToken,
};
