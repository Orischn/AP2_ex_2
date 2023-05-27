const { getChat, postChat, getChats, deleteChat } = require('../models/chats.js');


const addChat = async (req, res) => {
    const chat = await postChat(req.body);
    console.log(chat);
    return res.status(201).end(JSON.stringify(chat));
}

const receiveChat = async (req, res) => {
    const chat = await getChat(req.params.id);
    if (chat === 401) {
        return res.status(chat).end();
    } else {
        return res.status(200).end(JSON.stringify(chat));
    }
}

const receiveChats = async (req, res) => {
    const chats = await getChats();
    if (chats === 401) {
        return res.status(chats).end();
    } else {
        return res.status(200).end(JSON.stringify(chats));
    }
}

const removeChat = async (req, res) => {
    const chat = await deleteChat(req.params.id);
    if (chat === 401) {
        return res.status(chat).end();
    } else {
        return res.status(200).end(JSON.stringify(chat));
    }
}


module.exports = {
    addChat,
    receiveChat,
    receiveChats,
    removeChat
}