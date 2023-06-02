const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
let sockets = [];

app.use(express.json());
app.use(express.static('public'));
app.use(require('./routes/token'));
app.use(require('./routes/users'));
app.use(require('./routes/chats'));
app.use(require('./routes/messages'));

io.on('connection', (socket) => {
    // socket.on('loggedIn', (data) => {
    //     socket.name=data.username;
    //     sockets[data.username] = socket.id
    // })
    socket.on('messageSent', (message) => {
        socket.emit('message', message);
    })
}) 

app.listen(5000);