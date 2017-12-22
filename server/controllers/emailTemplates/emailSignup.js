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
  Thanks for signing up with Coinsaver. You're only a few simple steps away from investing change!  Coinsaver connects to your local bank, and automatically purchases Bitcoin/Ethereum to your Coinbase account. <br>
  <br>  
  <b>Step 1: Linking Coinbase: </b><br>
  Connect your existing Coinbase account. Don't have a Coinbase account yet? New users get $10 worth of Bitcoin for free via Coinbase's referral system after first $100 purchase of Cryptocurrency! Signup for a Coinbase and create a coinbase account at: https://www.coinbase.com/join/5a2ed616e0226602a21850e2\n <br>
  <br>
  <b>Step 2: Linking Bank Account via Plaid</b><br>
  Connect to your bank account of choice via Plaid's Secure Banking window. This gives Coinsaver (read only) access to transactions, that will be used to calculate the amount of accumulated change.<br>
  <br>
  <b>Step 3: Customize user settings</b><br>
  Choose what percentage of Bitcoin / Ethereum you want to automatically invest. You can set a monthly auto-buy, or minimum/maximum buy values.<br>

  <br><br>
  You are now ready to start investing! Thanks again for using Coinsaver.<br>
  <br>
  Sincerely,<br>
  Coinsaver Team 
  
  `
};
{/* <a href="https://www.coinbase.com/join/5a2ed616e0226602a21850e2" style="background-color:#1E90FF;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">Signup for Coinbase</a> */}

module.exports = emailSignup;