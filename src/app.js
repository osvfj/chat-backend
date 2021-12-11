const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { Server } = require('socket.io');
const cors = require('cors');

const { createServer } = require('http');
const { PORT } = require('./config');

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//settings
app.set('port', PORT);

//middlewares
app.use(express.json());
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
