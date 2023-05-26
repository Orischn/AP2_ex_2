import express from 'express'
import routerArticles from './routes/articles.js'
import routerLogin from './routes/login.js'
import bodyParser from 'body-parser';
import session from 'express-session'

const express = require('express')
const app = express()
app.use(express.json());
app.use(express.static('public'))
const jwt = require("jsonwebtoken")
const key = "Let S be an orthogonal transformation of gram schmidt"

const isLoggedIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const data = jwt.verify(token, key);
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}
const signToken = () => {
    
        const data = { username: req.body.username }
        const token = jwt.sign(data, key)
        //res.status(201).json({ token });
    
    
}


app.listen(89)