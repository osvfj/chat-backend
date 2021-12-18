const { validationResult } = require('express-validator');

// When you want to use a validaton schema middleware you have to add his function at the end of the array of middlewares

function fields(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
}

module.exports = fields;
