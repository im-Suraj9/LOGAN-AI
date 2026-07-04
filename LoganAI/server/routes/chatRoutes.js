const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getChatHistory,
  getChatById,
  deleteChat,
  renameChat,
  regenerateResponse,
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', sendMessage);
router.get('/history', getChatHistory);
router.get('/:id', getChatById);
router.put('/:id', renameChat);
router.delete('/:id', deleteChat);
router.post('/:id/regenerate', regenerateResponse);

module.exports = router;
