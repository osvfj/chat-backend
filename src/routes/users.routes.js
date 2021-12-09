const { Router } = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  deleteUser,
} = require('../controllers/users.controller');
const { notFound } = require('../middlewares');
const { userSchemaValidator, verifyId } = require('../middlewares/validations');

const router = Router();

router.get('/', getUsers);
router.get('/:id', [verifyId, notFound], getUser);
router.patch('/:id', [userSchemaValidator, notFound], updateUser);
router.put('/photo:/userId', [verifyId, notFound], updateAvatar);
router.delete('/:id', [verifyId, notFound], deleteUser);

module.exports = router;
