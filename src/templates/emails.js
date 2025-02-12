const templateForgot = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <meta charset="utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="format-detection"
      content="telephone=no, date=no, address=no, email=no"
    />
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Chat App - {{subject}}</title>
    <style>
      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
    </style>
    <style>
      .hover-bg-blue-600:hover {
        background-color: #2563eb !important;
      }
      .hover-underline:hover {
        text-decoration: underline !important;
      }
      @media (max-width: 600px) {
        .sm-w-full {
          width: 100% !important;
        }
        .sm-py-32 {
          padding-top: 32px !important;
          padding-bottom: 32px !important;
        }
        .sm-px-24 {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
        .sm-leading-32 {
          line-height: 32px !important;
        }
      }
      @media (prefers-color-scheme: dark) {
        .dark-mode-bg-gray-999 {
          background-color: #1b1c1e !important;
        }
        .dark-mode-bg-gray-989 {
          background-color: #2d2d2d !important;
        }
        .dark-mode-text-gray-979 {
          color: #a9a9a9 !important;
        }
        .dark-mode-text-white {
          color: #ffffff !important;
        }
      }
    </style>
  </head>
  <body
    class="dark-mode-bg-gray-999"
    style="
      margin: 0;
      width: 100%;
      padding: 0;
      word-break: break-word;
      -webkit-font-smoothing: antialiased;
      background-color: #f3f4f6;
    "
  >
    <div style="display: none">
      A request has been made to reset your password&#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &zwnj; &#160;&#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847;
      &#847; &zwnj; &#160;&#847; &#847; &#847; &#847; &#847;
    </div>
    <div
      role="article"
      aria-roledescription="email"
      aria-label="Password reset requested"
      lang="en"
    >
      <table
        class="sm-w-full"
        align="center"
        style="width: 600px"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
      >
        <tr>
          <td
            class="sm-py-32 sm-px-24"
            style="padding: 48px; text-align: center"
          >
            <a href="https://ohmysmtp.com">
              <img
                src="https://docs.ohmysmtp.com/img/logo.png"
                width="75"
                alt="Your Logo"
                style="
                  max-width: 100%;
                  vertical-align: middle;
                  line-height: 100%;
                  border: 0;
                "
              />
            </a>
          </td>
        </tr>
      </table>
      <table
        style="
          width: 100%;
          font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
            sans-serif;
        "
        cellpadding="0"
        cellspacing="0"
        role="presentation"
      >
        <tr>
          <td
            align="center"
            class="dark-mode-bg-gray-999"
            style="background-color: #f3f4f6"
          >
            <table
              class="sm-w-full"
              style="width: 600px"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tr>
                <td align="center" class="sm-px-24">
                  <table
                    style="margin-bottom: 48px; width: 100%"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                  >
                    <tr>
                      <td
                        class="
                          dark-mode-bg-gray-989 dark-mode-text-gray-979
                          sm-px-24
                        "
                        style="
                          background-color: #ffffff;
                          padding: 48px;
                          text-align: left;
                          font-size: 16px;
                          line-height: 24px;
                          color: #1f2937;
                        "
                      >
                      
                      {{content}}
                      
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;

module.exports = templateForgot;
