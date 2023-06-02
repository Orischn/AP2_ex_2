const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function getUser(username) {
    try {
      await client.connect();
      const db = client.db('Whatsapp');
      const users = db.collection('users');
      const user = await users.findOne({ username: username });
      if (!user) {
        return 401;
      }
      return {username: user.username, displayName: user.displayName, profilePic: user.profilePic};
    } catch (error) {
      return 500;
    } finally {
      client.close();
    }
  }

async function postUser(user) {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const users = db.collection('users');
        const existingUser = await users.findOne({ username: user.username });
        if (existingUser) {
          return 409;
        }
        await users.insertOne({
          username: user.username,
          password: user.password,
          displayName: user.displayName,
          profilePic: user.profilePic
        });
        return 201;
      } catch (error) {
        return 500;
      } finally {
        client.close();
      }
}

module.exports = {
    getUser,
    postUser
}