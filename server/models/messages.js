const { MongoClient } = require('mongodb');
const { getUser } = require('./users');
const { getChat } = require('./chats');
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function postMessage(message, chatId, me) {
    try {
        const sender = await getUser(me.username);
        await client.connect();
        const db = client.db('Whatsapp');
        const chats = db.collection('chats');
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        await chats.updateOne(
            { id: chatId },
            {
                $push: { messages: {
                    $each: [{ id: chatId, created: dateTime, sender: sender, content: message.msg }],
                    $position: 0
                }},
                $set: { lastMessage: { id: chatId, created: dateTime, sender: sender, content: message.msg }}
            }

        )
        return 201;
    } catch (error) {
        console.log(error);
        return 500;
    } finally {
        client.close();
    }
}

async function getMessages(chatId) {
    try {
        const chat = await getChat(parseInt(chatId));
        return chat.messages;
    } catch (error) {
        return 500;
    }
}

module.exports = {
    getMessages,
    postMessage,
}