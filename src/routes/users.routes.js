const { Router } = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  me,
} = require('../controllers/users.controller');
const { authorization, fields, csrf } = require('../middlewares');
const { userSchemaValidatorUpdate } = require('../middlewares/validations');

const router = Router();

router.get('/', getUsers);
router.get('/:username', getUser);
router.patch(
  '/',
  [authorization, csrf, userSchemaValidatorUpdate, fields],
  updateUser
);
router.delete('/', [authorization, csrf], deleteUser);

router.get('/profile/me', [authorization], me);

module.exports = router;
