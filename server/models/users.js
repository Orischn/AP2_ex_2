const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");


function getUser(username) {
    client.connect();
    const db = client.db('Whatsapp');
    const users = db.collection('users');
    const res = users.find({ id: username });
    if(!res) {
        client.close();
        return 404
    }
    client.close();
    return res;
}

function postUser(user) {
    client.connect();
    const db = client.db('Whatsapp');
    const users = db.collection('users');
    if (users.find({ id: user.username })) {
        client.close();
        return 409;
    }
    users.insertOne({
        id: user.username, password: user.password,
        displayName: user.displayName, profilePic: user.profilePic
    });
    client.close();
    return 201;
}

export default {
    getUser,
    postUser
}