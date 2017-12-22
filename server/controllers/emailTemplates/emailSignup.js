var emailList = ['coinsaverbot@gmail.com'];
var emailMessage = 'This is the message from CoinSaverBot!';
var emailSubject = 'Thank you for sign';
var emailHtml = '<b>Html here</b>'
var emailSignup = {
  from: '"CoinSaverBot 🎂" <coinsaverbot@gmail.com>',
  to: emailList,
  // subject: 'Coinsaverbot Email Transcript using Node.js',
  // text: `Users input: ${'\n \n'} ${emailMessage}`
  subject: 'Greetings from CoinSaverBot',
  text: `${emailMessage}`,
  html: `Our message is: ${emailMessage}
  Our message is: ${emailHtml}`
};

module.exports = emailSignup;