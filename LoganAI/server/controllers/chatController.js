const Chat = require('../models/Chat');
const Message = require('../models/Message');
const { getAIResponse } = require('../services/aiService');

/**
 * @desc    Send a message to the AI assistant. Creates a new chat if chatId is not provided.
 * @route   POST /api/chat
 * @access  Private
 */
const sendMessage = async (req, res, next) => {
  try {
    const { message, chatId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, user: req.user._id });
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
    } else {
      // Auto-generate a title from the first message
      const title = message.trim().slice(0, 50) + (message.length > 50 ? '...' : '');
      chat = await Chat.create({ user: req.user._id, title });
    }

    // Save the user's message
    await Message.create({ chat: chat._id, role: 'user', content: message });

    // Build conversation history for context (last 20 messages)
    const history = await Message.find({ chat: chat._id })
      .sort({ createdAt: 1 })
      .limit(20)
      .select('role content -_id');

    const formattedHistory = history.map((m) => ({ role: m.role, content: m.content }));

    // Get AI response
    const aiReply = await getAIResponse(formattedHistory);

    // Save the assistant's message
    const assistantMessage = await Message.create({
      chat: chat._id,
      role: 'assistant',
      content: aiReply,
    });

    chat.lastMessageAt = Date.now();
    await chat.save();

    res.status(200).json({
      chatId: chat._id,
      title: chat.title,
      message: {
        _id: assistantMessage._id,
        role: assistantMessage.role,
        content: assistantMessage.content,
        createdAt: assistantMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all chats (history) for the logged-in user
 * @route   GET /api/chat/history
 * @access  Private
 */
const getChatHistory = async (req, res, next) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ lastMessageAt: -1 });
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single chat with all its messages
 * @route   GET /api/chat/:id
 * @access  Private
 */
const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    const messages = await Message.find({ chat: chat._id }).sort({ createdAt: 1 });
    res.json({ chat, messages });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a chat and all its messages
 * @route   DELETE /api/chat/:id
 * @access  Private
 */
const deleteChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    await Message.deleteMany({ chat: chat._id });
    await chat.deleteOne();

    res.json({ message: 'Chat deleted successfully', chatId: req.params.id });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Rename a chat
 * @route   PUT /api/chat/:id
 * @access  Private
 */
const renameChat = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const chat = await Chat.findOne({ _id: req.params.id, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.title = title.trim().slice(0, 100);
    await chat.save();

    res.json(chat);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Regenerate the last assistant response for a chat
 * @route   POST /api/chat/:id/regenerate
 * @access  Private
 */
const regenerateResponse = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Remove the last assistant message if present
    const lastMessage = await Message.findOne({ chat: chat._id }).sort({ createdAt: -1 });
    if (lastMessage && lastMessage.role === 'assistant') {
      await lastMessage.deleteOne();
    }

    const history = await Message.find({ chat: chat._id })
      .sort({ createdAt: 1 })
      .limit(20)
      .select('role content -_id');

    const formattedHistory = history.map((m) => ({ role: m.role, content: m.content }));
    const aiReply = await getAIResponse(formattedHistory);

    const assistantMessage = await Message.create({
      chat: chat._id,
      role: 'assistant',
      content: aiReply,
    });

    chat.lastMessageAt = Date.now();
    await chat.save();

    res.status(200).json({
      message: {
        _id: assistantMessage._id,
        role: assistantMessage.role,
        content: assistantMessage.content,
        createdAt: assistantMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  getChatById,
  deleteChat,
  renameChat,
  regenerateResponse,
};
