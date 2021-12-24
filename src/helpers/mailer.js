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
    throw new Error(error);
  }
};

const getTemplate = (type, data) => {
  let template = '';
  let based = require('../templates/emails.js');

  switch (type) {
    case 'verify':
      template = `
              <div>
                          <p
                            class="sm-leading-32 dark-mode-text-white"
                            style="
                              margin: 0;
                              margin-bottom: 36px;
                              font-family: ui-serif, Georgia, Cambria,
                                'Times New Roman', Times, serif;
                              font-size: 24px;
                              font-weight: 600;
                              color: #000000;
                            "
                          >
                            Welcome to Chat App, ${data.user.name}! You need to validate your email before to login</p>
                          <p style="margin: 0; margin-bottom: 24px">
                            Click the link below to verify your email:
                          </p>
                          <a
                            href="${data.url}"
                            class="hover-bg-blue-600"
                            style="
                              display: inline-block;
                              background-color: #3b82f6;
                              padding-left: 24px;
                              padding-right: 24px;
                              padding-top: 16px;
                              padding-bottom: 16px;
                              text-align: center;
                              font-size: 16px;
                              font-weight: 600;
                              text-transform: uppercase;
                              color: #ffffff;
                              text-decoration: none;
                            "
                          >
                            <span style="mso-text-raise: 16px"
                              >Verify my email</span
                            >
                          </a>
                          <table
                            style="width: 100%"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="padding-top: 32px; padding-bottom: 32px"
                              >
                                <hr
                                  style="
                                    border-bottom-width: 0px;
                                    border-color: #f3f4f6;
                                  "
                                />
                              </td>
                            </tr>
                          </table>
                          <p
                            style="
                              margin: 0;
                              margin-bottom: 16px;
                              color: #6b7280;
                            "
                          >
                            This link will expire in 24 hours.
                          </p>
                        </div>
      `;
      break;
    case 'reset':
      template = `
              <div>
                          <p
                            class="sm-leading-32 dark-mode-text-white"
                            style="
                              margin: 0;
                              margin-bottom: 36px;
                              font-family: ui-serif, Georgia, Cambria,
                                'Times New Roman', Times, serif;
                              font-size: 24px;
                              font-weight: 600;
                              color: #000000;
                            "
                          >
                            A request to reset your password has been made.
                          </p>
                          <p style="margin: 0; margin-bottom: 24px">
                            Click the link below to set a new password
                          </p>
                          <a
                            href="${data.url}"
                            class="hover-bg-blue-600"
                            style="
                              display: inline-block;
                              background-color: #3b82f6;
                              padding-left: 24px;
                              padding-right: 24px;
                              padding-top: 16px;
                              padding-bottom: 16px;
                              text-align: center;
                              font-size: 16px;
                              font-weight: 600;
                              text-transform: uppercase;
                              color: #ffffff;
                              text-decoration: none;
                            "
                          >
                            <span style="mso-text-raise: 16px"
                              >Choose a new password</span
                            >
                          </a>
                          <table
                            style="width: 100%"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="padding-top: 32px; padding-bottom: 32px"
                              >
                                <hr
                                  style="
                                    border-bottom-width: 0px;
                                    border-color: #f3f4f6;
                                  "
                                />
                              </td>
                            </tr>
                          </table>
                          <p
                            style="
                              margin: 0;
                              margin-bottom: 16px;
                              color: #6b7280;
                            "
                          >
                            This link will expire in 24 hours.
                          </p>
                          <p
                            style="
                              margin: 0;
                              margin-bottom: 16px;
                              color: #6b7280;
                            "
                          >
                            If you did not make this request, you can ignore
                            this email
                          </p>
                        </div>
      `;

      break;
  }

  based = based.replace('{{content}}', template);
  based = based.replace('{{subject}}', data.subject);

  return based;
};

module.exports = {
  sendEmail,
  getTemplate,
};
