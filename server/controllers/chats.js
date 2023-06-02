const { getChat, postChat, getChats, deleteChat } = require('../models/chats.js');
const { getData } = require('../models/token');

const addChat = async (req, res) => {
    const me = await getData(req.headers.authorization)
    const chat = await postChat(req.body, me);
    if (chat === 400) {
        return res.status(400).end("No such user! :(");
    } else if (chat === 403) {
        return res.status(403).end("Thou shalt not speak with thyself (unless thou hast been doing drugs)")
    } else if (chat === 409) {
        return res.status(409).end("A chat with this user already exists!")
    } else if (chat === 500) {
        return res.status(500).end();
    }
    return res.status(201).end(JSON.stringify(chat));
}

const receiveChat = async (req, res) => {
    const chat = await getChat(parseInt(req.params.id));
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
    const chat = await deleteChat(parseInt(req.params.id));
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