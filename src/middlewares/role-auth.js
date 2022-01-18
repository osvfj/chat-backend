const roleAuth = (role) => {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        status: 403,
        message: 'Forbidden',
      });
    }
    return next();
  };
};

module.exports = roleAuth;
