const { request, response } = require('express');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const newConversation = async (req = request, res = response) => {
  const { reciverId } = req.body;
  const senderId = req.userId;

  try {
    const conversations = await Conversation.find({
      members: {
        $all: [senderId, reciverId],
      },
    });

    if (reciverId === senderId) {
      return res.status(500).json({
        message: 'You can not send message to yourself',
      });
    }

    if (conversations.length > 0) {
      return res.status(400).json({
        message: 'Conversation already exists',
      });
    }

    const reciverExist = await User.findOne({ _id: reciverId });

    if (!reciverExist) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const conversation = new Conversation({
      members: [senderId, reciverId],
    });

    await conversation.save();
    res.status(201).json({
      message: 'Conversation created',
      conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error creating conversation',
    });
  }
};

const getConversations = async (req = request, res = response) => {
  const userId = req.userId;

  try {
    const conversations = await Conversation.find({
      members: {
        $in: [userId],
      },
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving conversations',
      error,
    });
  }
};

module.exports = {
  newConversation,
  getConversations,
};
