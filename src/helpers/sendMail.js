const { v4: uuid } = require('uuid');
const { ORIGIN_URL } = require('../config');
const client = require('../helpers/redis');
const { getTemplate, sendEmail } = require('./mailer');

async function sendMail({ user, template, subject, templateData }) {
  const token = uuid();
  client.set(`verify:${token}`, user._id.toString(), {
    EX: 60 * 60 * 24 * 1000,
  });

  const this_template = getTemplate(template, {
    url: `${ORIGIN_URL}/api/auth/verify/${token}`,
    user,
    subject,
    ...templateData,
  });

  await sendEmail(user.email, subject, this_template);
}

module.exports = sendMail;
