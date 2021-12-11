const { JWT_ACCESS_TOKEN, COOKIE_ACCESS_NAME } = require('../config');
const { verifyToken } = require('../helpers');

const authorization = async (req, res, next) => {
  const token = req.cookies[COOKIE_ACCESS_NAME] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      msg: 'No token provided.',
    });
  }

  try {
    const { id } = await verifyToken(token, JWT_ACCESS_TOKEN);
    req.userId = id;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({
      msg: error.message,
    });
  }
};

module.exports = authorization;
