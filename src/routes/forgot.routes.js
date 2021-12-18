const { Router } = require('express');
const {
  forgotPassword,
  resetPassword,
} = require('../controllers/forgot.controller');
const router = Router();

router.post('/password', forgotPassword);
router.post('/password/reset/', resetPassword);

module.exports = router;
