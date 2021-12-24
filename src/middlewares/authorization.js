const { JWT_ACCESS_TOKEN, COOKIE_ACCESS_NAME } = require('../config');
const { verifyToken } = require('../helpers');

const authorization = async (req, res, next) => {
  //get the access token from the cookie or the header
  const token = req.cookies[COOKIE_ACCESS_NAME] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      msg: 'No token provided.',
    });
  }

  try {
    //verify the token, if it is valid, the user id will be saved in the request
    const { id } = await verifyToken(token, JWT_ACCESS_TOKEN);
    req.userId = id;
    return next();
  } catch (error) {
    return res.status(error.status).json({
      msg: error.message,
    });
  }
};

module.exports = authorization;
