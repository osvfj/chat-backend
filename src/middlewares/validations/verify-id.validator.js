const { check } = require('express-validator');
const { userNotFound } = require('../../helpers');

const verifyId = [
  check('id', 'The ID is not valid').isMongoId(),
  check('id').custom(userNotFound),
];

module.exports = verifyId;
