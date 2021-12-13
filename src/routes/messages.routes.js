const { Router } = require('express');
const { authorization } = require('../middlewares/');

const {
  newMessage,
  getMessages,
} = require('../controllers/messages.controller');
const router = Router();

router.post('/', [authorization], newMessage);
router.get('/:conversationId', [authorization], getMessages);

module.exports = router;
