const { getUser, postUser } = require('../models/users.js');


const addUser = async (req, res) => {
    return res.status(await postUser(req.body)).end();
}

const recieveUser = async (req, res) => {
    const user = await getUser(req.params.username);
    if (user === 401) {
        return res.status(user).end();
    } else {
        return res.status(200).end(JSON.stringify(user));
    }
}

module.exports = {
    addUser,
    recieveUser,
}