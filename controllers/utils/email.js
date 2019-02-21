const nodeMailer = require('nodemailer');
const keys = require('../../config/keys');

module.exports = function sendEmail(receiver, name, date, transcript) {
  // if (process.env.NODE_ENV !== 'production') {
  //   return; // Disable email for dev
  // }
  const text = `Hello ${name},\n\n
    Here is your transcript on ${date}:\n
    ${transcript}\n\n
    From Munich with love,
  `;

  const mailOptions = {
    from: '"CareerFoundry" <careerfoundry@zoho.com>', // sender address
    to: receiver, // receiver or list of receivers
    subject: 'Your Transcript', // Subject line
    text, // plain text body
    html: `<p>${text.replace(/(?:\n)/g, '<br>')}</p>`, // html body - keep it simple for now
  };

  const transporter = nodeMailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465 port, false for other ports
    auth: {
      user: keys.username,
      pass: keys.password,
    }
  });

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error: ', error);
    } else {
      console.log('Email sent: ', info);
    }
  });
};
