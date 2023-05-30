const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function getChat(id) {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const chats = db.collection('chats');
        const res = await chats.findOne({ id: id });
        if (!res) {
            return 401;
        }
        return res;
    } catch (error) {
        return 500;
    } finally {
        client.close();
    }
}

async function getChats() {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const chats = db.collection('chats');
        const res = await chats.find({});
        if (!res) {
            return 401;
        }
        let allChats = [];

        await res.forEach((chat) => {
            allChats.push(chat);
        });
        return allChats;
    } catch (error) {
        return 500;
    } finally {
        client.close();
    }
}

async function postChat(username) {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const chats = db.collection('chats');
        const users = db.collection('users');
        const existingUser = await users.findOne(username);
        if (!existingUser) {
            return 400;
        }
        const existingChat = await chats.findOne({
            user: {
                ...username,
                displayName: existingUser.displayName,
                profilePic: existingUser.profilePic
            }
        });
        if (existingChat) {
            return 409;
        }
        let nextId = (await chats.stats()).count;
        console.log(nextId);
        const chat = {
            id: nextId ? (nextId + 1) : 1,
            user: {
                ...username,
                displayName: existingUser.displayName,
                profilePic: existingUser.profilePic
            },
            lastMessage: null
        }
        await chats.insertOne(chat);
        return chat;
    } catch (error) {
        return 500;
    } finally {
        client.close();
    }
}

async function deleteChat(id) {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const chats = db.collection('chats');
        const res = await chats.findOne({ id: id });
        if (!res) {
            return 404;
        }
        await chats.deleteOne({ id: id });
        return 200;
    } catch (error) {
        return 500;
    } finally {
        client.close();
    }
}

module.exports = {
    getChat,
    getChats,
    postChat,
    deleteChat
}