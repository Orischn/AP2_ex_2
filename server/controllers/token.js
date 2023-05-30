const { checkValidity, postToken } = require('../models/token');

const checkToken = async (req, res, next) => {
    const status = await checkValidity(req.headers.authorization);
    if (status === 401) {
        return res.status(401).send("Invalid Token").end();
    } else if (status === 403) {
        return res.status(403).send('Token required').end();
    } else {
        return next();
    }
}

const signToken = async (req, res) => {
    const token = await postToken(req.body);
    if (token === 404) {
        return res.status(token).end('Incorrect username and/or password');
    } else if (token === 500) {
        return res.status(500).end("Internal server error, Please try again.");
    }
    return res.status(201).end(token);
}

module.exports =  {
    checkToken,
    signToken,
}
