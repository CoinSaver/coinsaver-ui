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
      user: coinsaverbot.email,
      pass: coinsaverbot.pw
      // user: 'fake@gmail.com',
      // pass: 'fake'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// var emailList = ['coinsaverbot@gmail.com', 'codeslingbot@gmail.com'];
var emailList = ['coinsaverbot@gmail.com'];
var ourMessage = 'This is the 5 email from CoinSaver, hope it goes through!';
console.log('Button was clicked - server TEXT: ', ourMessage);
var mailOptions = {
  from: '"CoinSaverBot 🎂" <fakeemail@gmail.com>',
  to: emailList,
  // subject: 'CodeslingBot Email Transcript using Node.js',
  // text: `Users input code: ${'\n \n'} ${ourMessage}`
  subject: 'Greetings from CoinSaverBot',
  text: `${ourMessage}`,
  html: `<b>Html Test</b> 
    Our message is: ${ourMessage}`
};

var sendCoinsaverbotEmail = function (mailOptions) { 
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Your CodeslingEmail Error: ', error);
    } else {
      console.log('CodeSling Email sent: ' + info.response);
    }
  });
  console.log('sendCoinsaverbotEmail function ran');
}
// sendCoinsaverbotEmail(mailOptions);
console.log('IN END of /send event');
