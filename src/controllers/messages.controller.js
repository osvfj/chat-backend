const { request, response } = require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const newMessage = async (req = request, res = response) => {
  const senderId = req.userId;
  const { conversationId, message } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: 'This conversation does not exist',
      });
    }

    const newMessage = new Message({
      senderId,
      conversationId,
      message,
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al crear el mensaje',
    });
  }
};

const getMessages = async (req = request, res = response) => {
  const { conversationId } = req.params;
  const userId = req.userId;

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: 'This conversation does not exist',
      });
    }

    if (!conversation.members.includes(userId)) {
      return res.status(401).json({
        message: 'You are not part of this conversation',
      });
    }

    const messages = await Message.find({ conversationId });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los mensajes',
    });
  }
};

module.exports = {
  newMessage,
  getMessages,
};
