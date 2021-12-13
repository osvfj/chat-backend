const { Router } = require('express');
const router = Router();
const {
  getConversations,
  newConversation,
} = require('../controllers/conversation.controller');
const { authorization } = require('../middlewares');

router.post('/', [authorization], newConversation);
router.get('/', [authorization], getConversations);

module.exports = router;
