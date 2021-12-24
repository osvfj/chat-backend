const { Router } = require('express');
const { check } = require('express-validator');
const { csrf } = require('../middlewares');
const {
  login,
  register,
  logout,
  newToken,
  getCsrfToken,
  verifyUser,
  sendVerify,
} = require('../controllers/auth.controller');
const { usernameDoesNotExist } = require('../helpers');
const { fields, authorization } = require('../middlewares');
const { userSchemaValidator } = require('../middlewares/validations');

const router = Router();

//login validation
const loginValidations = [
  userSchemaValidator[2],
  userSchemaValidator[3],
  check('username').custom(usernameDoesNotExist),
];

router.post('/login', [loginValidations, fields], login);
router.post('/register', [userSchemaValidator, fields], register);
router.get('/logout', [authorization], logout);
router.post('/refresh', [authorization], newToken);
router.get('/csrf', [authorization], getCsrfToken);
router.get('/verify/:token', verifyUser);
router.post('/verify', sendVerify);

router.get('/check', [authorization], (req, res) => {
  res.status(200).json({ msg: 'user is logged in' });
});

module.exports = router;
