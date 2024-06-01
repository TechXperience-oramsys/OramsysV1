const transporter = require('../mailConfig');

const sendMail = (to, subject, text, html) => {

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to,                           // List of recipients
    subject,                      // Subject line
    text,                         // Plain text body
    html,                         // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Email Error: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendMail;