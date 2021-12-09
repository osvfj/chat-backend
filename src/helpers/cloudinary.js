const cloudinary = require('cloudinary').v2;
const {
  CLOUDINARY_KEY,
  CLOUD_NAME,
  CLOUDINARY_SECRET_KEY,
} = require('../config');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

module.exports = cloudinary;
