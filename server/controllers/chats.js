const { getChat, postChat, getChats, deleteChat } = require('../models/chats.js');


const addChat = async (req, res) => {
    const chat = await postChat(req.body);
    if (chat === 400) {
        return res.status(400).end("No such user.");
    } else if (chat === 409) {
        return res.status(409).end("A chat with this user already exists!")
    } else if (chat === 500) {
        return res.status(500).end();
    }
    return res.status(201).end(JSON.stringify(chat));
}

const receiveChat = async (req, res) => {
    const chat = await getChat(req.params.id);
    if (chat === 401) {
        return res.status(401).end();
    } else if (chat === 500) {
        return res.status(500).end();
    }
    return res.status(200).end(JSON.stringify(chat));
}

const receiveChats = async (req, res) => {
    const chats = await getChats();
    if (chats === 401) {
        return res.status(401).end();
    } else if (chats === 500) {
        return res.status(500).end();
    }
    return res.status(200).end(JSON.stringify(chats));
}

const removeChat = async (req, res) => {
    const chat = await deleteChat(req.params.id);
    if (chat === 404) {
        return res.status(404).end();
    } else if (chat === 500) {
        return res.status(500).end();
    }
    return res.status(200).end(JSON.stringify(chat));
}


module.exports = {
    addChat,
    receiveChat,
    receiveChats,
    removeChat
}