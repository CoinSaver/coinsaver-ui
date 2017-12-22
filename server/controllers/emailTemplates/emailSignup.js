var emailList = ['coinsaverbot@gmail.com'];
var emailMessage = "This is the message from CoinSaverBot!";
var emailSubject = "Welcome to Coinsaver! Here's some help with how to get started";
var emailHtml = `<b>Html here</b>`

var emailSignup = {
  from: '"CoinSaverBot☕💰" <coinsaverbot@gmail.com>',
  to: emailList,
  // subject: 'Coinsaverbot Email Transcript using Node.js',
  // text: `Users input: ${'\n \n'} ${emailMessage}`
  subject: 'Greetings from CoinSaverBot',
  text: `${emailMessage}`,
  html: `
  Thanks for signing up with Coinsaver. You're only a few simple steps away from investing change! <br>
  Coinsaver connects to your local bank, and automatically purchases Bitcoin/Ethereum to your Coinbase account. <br>
  <br><br>  
  <b>Linking Coinbase: </b><br>
  Don't have a Coinbase account yet?<br>
  Signup for a Coinbase and create a coinbase account at: https://www.coinbase.com/join/5a2ed616e0226602a21850e2\n
  `
};
{/* <a href="https://www.coinbase.com/join/5a2ed616e0226602a21850e2" style="background-color:#1E90FF;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">Signup for Coinbase</a> */}

module.exports = emailSignup;