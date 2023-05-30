const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
const key = "Let S be an orthogonal transformation of gram schmidt";

const checkValidity = async (authorization) => {
    if (authorization) {
        const token = authorization.split(" ")[1];
        try {
            const data = await jwt.verify(token, key);
            return 200;
        } catch (err) {
            return 401;
        }
    } else {
        return 403;
    }
}

const postToken = async (user) => {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const users = db.collection('users');
        const existingUser = await users.findOne({
            username: user.username,
            password: user.password
        });
        if (!existingUser) {
            return 404;
        }
        const token = jwt.sign(user, key);
        return token;
    } catch (error) {
        return 500;
    } finally {
        client.close();
    }
}

module.exports = {
    postToken,
    checkValidity,
}