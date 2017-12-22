var emailList = ['coinsaverbot@gmail.com'];
var emailMessage = "This is the message from CoinSaverBot!";
var emailSubject = "Welcome to Coinsaver! Here's some help with how to get started";
var emailHtml = '<b>Html here</b>'
var emailSignup = {
  from: '"CoinSaverBot☕💰" <coinsaverbot@gmail.com>',
  to: emailList,
  // subject: 'Coinsaverbot Email Transcript using Node.js',
  // text: `Users input: ${'\n \n'} ${emailMessage}`
  subject: 'Greetings from CoinSaverBot',
  text: `${emailMessage}`,
  html: `Our message is: ${emailMessage}
  Our message is: ${emailHtml}`
};

module.exports = emailSignup;