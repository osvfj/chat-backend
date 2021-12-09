const express = require('express');
const { createServer } = require('http');
const { PORT } = require('./config');

const app = express();
const server = createServer(app);

app.set('port', PORT);
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = { server, app };
