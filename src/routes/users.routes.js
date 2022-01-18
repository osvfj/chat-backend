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
const { roleAuth } = require('../middlewares');
const { roles } = require('../helpers');

const router = Router();

router.get('/', [authorization, roleAuth(roles.admin)], getUsers);
router.get('/:username', getUser);
router.patch(
  '/',
  [authorization, csrf, userSchemaValidatorUpdate, fields],
  updateUser
);
router.delete('/', [authorization, csrf], deleteUser);

router.get('/profile/me', [authorization], me);

module.exports = router;
