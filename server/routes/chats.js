const express = require('express');
const { checkToken } = require('../controllers/token.js')
const { addChat, receiveChat, receiveChats, removeChat } = require('../controllers/chats.js');
const router = express.Router();

router.post('/api/Chats', checkToken, addChat);
router.get('/api/Chats', checkToken, receiveChats)
router.get('/api/Users/:username', checkToken, receiveChat);
router.delete('/api/Chats/:username', checkToken, removeChat);
module.exports = router;