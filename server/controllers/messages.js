const { getMessages, postMessage } = require('../models/messages');
const { getData } = require('../models/token');

const sendMessage = async (req, res) => {
    const me =  await getData(req.headers.authorization);
    const chat = await postMessage(req.body, parseInt(req.params.id), me);
    if (chat === 500) {
        return res.status(500).end();
    }
    return res.status(201).end();
}

const receiveMessages = async (req, res) => {
    const messages = await getMessages(req.params.id);
    if (messages === 500) {
        return res.status(500).end();
    }
    return res.status(200).end(JSON.stringify(messages));
}

module.exports = {
    sendMessage,
    receiveMessages,
}