const { client } = require('../helpers');

const csrf = async (req, res, next) => {
  try {
    const token = req.headers['x-csrf-token'] || req.body['x-csrf-token'];

    const csrfRedis = await client.get(`csrf:${req.userId}`);
    if (!token || csrfRedis !== token) {
      return res.status(403).send('csrf token not valid or expired');
    }

    next();
    client.del(`csrf:${req.userId}`);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = csrf;
