const User = require('../models/User');
const {
  COOKIE_ACCESS_NAME,
  COOKIE_REFRESH_NAME,
  COOKIES_OPTIONS,
} = require('../config');
const { createTokens, client, sendMail } = require('../helpers');

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      msg: 'Email is required',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'User does not exist',
      });
    }

    sendMail({
      user,
      subject: 'Reset password',
      template: 'reset',
    });

    res.status(200).json({
      msg: 'Reset password link sent',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  if (!resetToken || !password) {
    return res.status(400).json({
      msg: 'Token and password are required',
    });
  }

  try {
    const userId = await client.get(`reset:${resetToken}`);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        msg: 'Invalid token',
      });
    }

    user.password = password;
    client.del(`reset:${resetToken}`);

    await user.save();

    const { accessToken, refreshToken } = await createTokens(user._id);
    return res
      .cookie(COOKIE_ACCESS_NAME, accessToken, COOKIES_OPTIONS)
      .cookie(COOKIE_REFRESH_NAME, refreshToken, COOKIES_OPTIONS)
      .json({
        msg: 'Password reset successfully',
        user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};

module.exports = { forgotPassword, resetPassword };
