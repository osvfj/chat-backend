require('dotenv').config();

const cookieAccessName =
  process.env.NODE_ENV === 'production' ? '__Secure-acct' : 'acct';
const cookieRefreshName =
  process.env.NODE_ENV === 'production' ? '__Secure-rft' : 'rft';

const cookiesOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,

  REDIS_URI: process.env.REDIS_URI,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  CLOUD_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,

  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_REDIS_EXPIRES_IN: process.env.ACCESS_REDIS_EXPIRES_IN,
  REFRESH_REDIS_EXPIRES_IN: process.env.REFRESH_REDIS_EXPIRES_IN,
  CSRF_TOKEN_EXPIRES_IN: process.env.CSRF_TOKEN_EXPIRES_IN,

  ORIGIN_URL: process.env.ORIGIN_URL,

  COOKIE_ACCESS_NAME: cookieAccessName,
  COOKIE_REFRESH_NAME: cookieRefreshName,
  COOKIES_OPTIONS: cookiesOptions,

  // Email
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
};
