const { Router } = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  deleteUser,
} = require('../controllers/users.controller');
const { authorization, fields } = require('../middlewares');
const { userSchemaValidatorUpdate } = require('../middlewares/validations');

const router = Router();

router.get('/', getUsers);
router.get('/:username', getUser);
router.patch(
  '/',
  [authorization, userSchemaValidatorUpdate, fields],
  updateUser
);
router.delete('/', [authorization], deleteUser);

module.exports = router;
