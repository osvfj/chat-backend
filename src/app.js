const fs = require('fs');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const { Server } = require('socket.io');
const { createServer } = require('http');
const { PORT, ORIGIN_URL } = require('./config');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ORIGIN_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

//settings
app.set('port', PORT);

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGIN_URL,
    credentials: true,
  })
);
app.use(
  fileUpload({
    tempFileDir: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
  })
);

//routes

//gets all the files in the routes folder
fs.readdirSync(`${__dirname}/routes`).forEach((file) => {
  const name = file.split('.')[0];
  const route = require(`./routes/${file}`);
  app.use(`/api/${name}`, route);
});

require('./sockets')(io);

module.exports = { server, app };
