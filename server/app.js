const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(require('./routes/token'));
app.use(require('./routes/users'));
app.use(require('./routes/chats'))
app.listen(5000);