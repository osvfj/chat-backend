const { check } = require('express-validator');
const { emailAlreadyExists, usernameAlreadyExists } = require('../../helpers');

const userSchemaValidator = [
  check('name', 'The name should be a string').not().isEmpty().isString(),
  check('email', 'The email is not valid').isEmail().trim().not().isEmpty(),
  check('username', 'The username is not valid')
    .isLength({ min: 3 })
    .trim()
    .not()
    .isEmpty(),
  check('password', 'The password is not valid')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
  check('email').custom(emailAlreadyExists),
  check('username').custom(usernameAlreadyExists),
];

const userSchemaValidatorUpdate = [
  check('name', 'The name should be a string').isString().optional(),
  check('email', 'The email is not valid').isEmail().trim().optional(),
  check('username', 'The username is not valid')
    .isLength({ min: 3 })
    .trim()
    .optional(),
  check('password', 'The password is not valid')
    .isLength({ min: 6 })
    .optional(),
  check('email').custom(emailAlreadyExists),
  check('username').custom(usernameAlreadyExists),
];

module.exports = { userSchemaValidator, userSchemaValidatorUpdate };
