const mongoose = require('mongoose');

/**
 * Chat Schema
 * Represents a conversation thread's metadata. Actual messages are stored
 * in the separate Message collection and linked via the `chat` reference.
 */
const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'New Chat',
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
