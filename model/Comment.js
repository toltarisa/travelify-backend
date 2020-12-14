const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
