const { Schema, model } = require('mongoose');

const conversationSchema = new Schema(
  {
    members: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Conversation', conversationSchema);
