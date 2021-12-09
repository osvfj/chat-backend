const { Router } = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  deleteUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.put('/photo:/userId', updateAvatar);
router.delete('/:id', deleteUser);

module.exports = router;
