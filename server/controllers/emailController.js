const nodemailer = require('nodemailer');
const coinsaverbot = require('../../config/config.js').coinsaverbot

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    // secure: false, // use SSL
    secureConnection: true,  
    // port: 25, // port for secure SMTP
    port: 465, // port for secure SMTP
    auth: {
      user: coinsaverbot.email,
      pass: coinsaverbot.pw
      // user: 'test@gmail.com',
      // pass: 'test'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// -- Sample Mail Options Template //
/*
var emailList = ['coinsaverbot@gmail.com'];
var emailMessage = 'This is the message from CoinSaverBot!';
var emailSubject = 'Greetings from CoinSaverBot';
var emailHtml = '<b>Html here</b>'
var mailOptions = {
  from: '"CoinSaverBot 🎂" <coinsaverbot@gmail.com>',
  to: emailList,
  // subject: 'Coinsaverbot Email Transcript using Node.js',
  // text: `Users input: ${'\n \n'} ${emailMessage}`
  subject: 'Greetings from CoinSaverBot',
  text: `${emailMessage}`,
  html: `Our message is: ${emailMessage}
  Our message is: ${emailHtml}`
};
*/
// -- Sample Mail Options Template //

var sendCoinsaverbotEmail = function (mailOptions) { 
  console.log('Email was triggered - server TEXT: ', mailOptions);
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Your Coinsaverbot Email Error: ', error);
    } else {
      console.log('Coinsaverbot Email sent: ' + info.response);
    }
  });
  console.log('sendCoinsaverbotEmail function ran');
}
// sendCoinsaverbotEmail(mailOptions);

module.exports = {sendCoinsaverbotEmail}

