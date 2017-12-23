import * as nodemailer from 'nodemailer';
import config from '../config/email';

export default function(resetEmail: string, resetLink: string, fn) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: config.Port,
    secure: config.Security, // true for 465, false for other ports
    auth: {
      user: config.Account.Username, // generated ethereal user
      pass: config.Account.Password // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: config.Account.Username, // sender address
    // from: `"busydoor.com" <${config.Account.Username}>`, // sender address
    to: resetEmail, // list of receivers
    subject: 'Busydoor reset password', // Subject line

    html: `
    <h2>Hi,</h2>
    <p> To change your busydoor password, click here or paste the following link into your browser: </p>
    <a href=${resetLink}
       target='_blank'> ${resetLink}</a>
    <p> This link will expire in 24 hours, so be sure to use it right away. </p>
    <p> Thank you for using busydoor! </p>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    fn(error, info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}
