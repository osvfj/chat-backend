const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

MessageSchema.plugin(mongoosePaginate);

module.exports = model('Message', MessageSchema);
