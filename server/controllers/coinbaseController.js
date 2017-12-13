const COINBASE_KEYS = require('../../config/config.js').coinbaseAPI;
const coinbase = require('coinbase');
const axios = require('axios');

let accessToken = '';
let refreshToken = '';

var getClient = function(accessTokenTemp, refreshTokenTemp){
  const client = new coinbase.Client({
    'accessToken' : accessTokenTemp,
    'refreshToken' : refreshTokenTemp
  });
  // You now have coinbase Auth

  client.getAccounts({}, function(err, accounts) {
    accounts.forEach(function(acct) {
      console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
    });
  });
}

var getAccessToken = function(usercode){
  console.log('working on code: ', usercode)

  axios.post("https://api.coinbase.com/oauth/token", {
    grant_type: 'authorization_code',
    code: usercode,
    client_id: COINBASE_KEYS.COINBASE_CLIENT_ID,
    client_secret: COINBASE_KEYS.COINBASE_SECRET,
    redirect_uri: 'http://localhost:9001/verifybase',
  })
  .then(function (response) {
    console.log(response.data);
    getClient(response.data.access_token, response.data.refresh_token)
  })
  .catch(function (error) {
    console.log('fail')
  });
}

module.exports = {getAccessToken}