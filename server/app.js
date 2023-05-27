const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(require('./routes/token'));
app.use(require('./routes/users'));
app.listen(5000);