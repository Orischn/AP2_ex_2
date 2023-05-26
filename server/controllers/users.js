import {getUser, postUser} from '../models/users.js'


const addUser = (req, res) => {
    res.status(postUser(req.body));
    res.end();
}

// const receiveUser = (req, res) => {
//     res.send(getUser(req.body.username));
// }

export default addUser