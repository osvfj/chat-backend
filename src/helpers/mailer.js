const nodemailer = require('nodemailer');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = require('../config');

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify().then(() => {
  console.log('Server is ready to send emails');
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Chat App" <${EMAIL_USER}>`,
      to: `${email}`,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getTemplate = (type, data) => {
  let template = '';
  switch (type) {
    case 'verify':
      template = `
            <h1>Verify your account</h1>
            <p>
            <a href="${data.url}">Verify</a>
            </p>
        `;
      break;
    case 'reset':
      template = `
            <h1>Reset your password</h1>
            <p>
            <a href="${data.url}">Reset</a>
            </p>
        `;
      break;
  }
  return template;
};

module.exports = {
  sendEmail,
  getTemplate,
};
