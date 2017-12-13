const nodemailer = require('nodemailer');
const coinsaverbot = require('../../config/config.js').coinsaverbot

console.log('nodemailer: ', nodemailer);

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    // secure: false, // use SSL
    secureConnection: true,  
    // port: 25, // port for secure SMTP
    port: 465, // port for secure SMTP
    auth: {
      user: coinsaverbot.email2,
      pass: coinsaverbot.pw2
      // user: 'fake@gmail.com',
      // pass: 'fake'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// var emailList = ['coinsaverbot@gmail.com', 'codeslingbot@gmail.com'];
var emailList = ['coinsaverbot@gmail.com'];
var ourMessage = 'This is the first email from CoinSaver, hope it goes through!';
console.log('Button was clicked - server TEXT: ', ourMessage);
var mailOptions = {
  from: '"TestUser 🎂" <codeslingbot@gmail.com>',
  to: emailList,
  // subject: 'CodeslingBot Email Transcript using Node.js',
  // text: `Users input code: ${'\n \n'} ${ourMessage}`
  subject: 'Greetings from CodeslingBot',
  text: `${ourMessage}`,
  // html: '<b>Html Test</b>'
};

// transporter.sendMail(mailOptions, function(error, info) {
//   if (error) {
//     console.log('Your CodeslingEmail Error: ', error);
//   } else {
//     console.log('CodeSling Email sent: ' + info.response);
//   }
// });
console.log('IN END of /send event');
