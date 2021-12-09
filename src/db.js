const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const db = mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
