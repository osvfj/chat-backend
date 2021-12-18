const { request, response } = require('express');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const newConversation = async (req = request, res = response) => {
  const { reciverId } = req.body;
  const senderId = req.userId;

  try {
    // Find a conversation between the sender and the reciver
    const conversations = await Conversation.find({
      members: {
        $all: [senderId, reciverId],
      },
    });

    if (reciverId === senderId) {
      return res.status(500).json({
        message: 'You cannot send a message to yourself',
      });
    }

    if (conversations.length > 0) {
      return res.status(400).json({
        message: 'Conversation already exists',
      });
    }

    // find the reciver in the database
    const reciverExist = await User.findOne({ _id: reciverId });

    // if the reciver does not exist return a message
    if (!reciverExist) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Create a new conversation between the sender and the reciver
    const conversation = new Conversation({
      members: [senderId, reciverId],
    });

    // save the conversation and return the conversation
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
    // Find all conversations where the user is a member
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
