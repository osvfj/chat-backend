const { v4: uuid } = require('uuid');
const { ORIGIN_URL } = require('../config');
const client = require('../helpers/redis');
const { getTemplate, sendEmail } = require('./mailer');

async function sendMail({ user, template, subject, templateData }) {
  const token = uuid();
  client.set(`${template}:${token}`, user._id.toString(), {
    EX: 60 * 60 * 24 * 1000,
  });

  let url;

  template === 'reset'
    ? (url = `${ORIGIN_URL}/reset-password/${token}`)
    : (url = `${ORIGIN_URL}/verify/${token}`);

  const this_template = getTemplate(template, {
    url,
    user,
    subject,
    ...templateData,
  });

  await sendEmail(user.email, subject, this_template);
}

module.exports = sendMail;
