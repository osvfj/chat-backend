const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const conversationSchema = new Schema(
  {
    members: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

conversationSchema.plugin(mongoosePaginate);

module.exports = model('Conversation', conversationSchema);
