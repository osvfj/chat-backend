const { validationResult } = require('express-validator');

function fields(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
}

function notFound(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors);
  }

  next();
}

module.exports = { fields, notFound };
