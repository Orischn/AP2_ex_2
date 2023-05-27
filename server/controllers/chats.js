const { getChat, postChat, getChats, deleteChat } = require('../models/chats.js');


const addChat = async (req, res) => {
    const chat = await postChat(req.body);
    return res.status(await postChat(req.body)).end();
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
    const chat = await getChats();
    if (chat === 401) {
        return res.status(chat).end();
    } else {
        return res.status(200).end(JSON.stringify(chat));
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