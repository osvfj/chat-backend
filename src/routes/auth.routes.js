const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth.controller');
const { usernameDoesNotExist } = require('../helpers');
const { fields, notFound } = require('../middlewares');
const { userSchemaValidator } = require('../middlewares/validations');

const router = Router();

//login validation
const loginValidations = [
  userSchemaValidator[2],
  userSchemaValidator[3],
  check('username').custom(usernameDoesNotExist),
];

router.post('/login', [loginValidations, fields, notFound], login);
router.post('/register', [userSchemaValidator, fields, notFound], register);

module.exports = router;
