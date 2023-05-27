const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

async function getUser(username) {
    try {
      await client.connect();
      const db = client.db('Whatsapp');
      const users = db.collection('users');
      const res = await users.findOne({ id: username });
      if (!res) {
        return 401;
      }
      return res;
    } catch (error) {
      console.error('Error in getUser:', error);
      return 500; // Internal server error
    } finally {
      client.close();
    }
  }

async function postUser(user) {
    try {
        await client.connect();
        const db = client.db('Whatsapp');
        const users = db.collection('users');
        const existingUser = await users.findOne({ id: user.username });
        if (existingUser) {
          return 409;
        }
        await users.insertOne({
          id: user.username,
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