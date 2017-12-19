const COINBASE_KEYS = require('../../config/config.js').coinbaseAPI;
const coinbase = require('coinbase');
const axios = require('axios');

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

  // set something = accounts
  });
}

var getWallet = function(uid, accessTokenTemp, refreshTokenTemp, callback){
  const client = new coinbase.Client({
    'accessToken' : accessTokenTemp,
    'refreshToken' : refreshTokenTemp
  })

  client.getAccounts({}, function(err, accounts) {
    // console.log(accounts);

    let acctobj = {};
      accounts.forEach(function(acct) {
        acctobj[acct.name] = acct.balance.amount 
        console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
      });
    callback(acctobj)
  });
}

var buyCoin = function(uid, accessTokenTemp, refreshTokenTemp, callback){

  const client = new coinbase.Client({
    'accessToken' : accessTokenTemp,
    'refreshToken' : refreshTokenTemp
  })

  client.getAccounts({}, function(err, account) {
    console.log('the account is,' ,account)
    callback(account)
  });

  client.getAccount("ACCOUNTNUMBHERE", function(err, account) {
    account.buy({"amount": "10",
    "currency": "USD",
    "quote": true}, function(err, tx) {
      console.log(tx);
      console.log(err)
    });
  });
}

var getAccessToken = function(usercode, callback){
  console.log('working on code: ', usercode)

  return axios.post("https://api.coinbase.com/oauth/token", {
    grant_type: 'authorization_code',
    code: usercode,
    client_id: COINBASE_KEYS.COINBASE_CLIENT_ID,
    client_secret: COINBASE_KEYS.COINBASE_SECRET,
    redirect_uri: 'http://localhost:9001/account/',
  })
  .then(function (response) {
    console.log('the response data is:', response.data);
    callback(response.data)
    // getClient(response.data.access_token, response.data.refresh_token)
  })
  .catch(function (error) {
    console.log('fail: ', error)
  });
}

var getRefreshToken = function(usercode, refreshToken, callback){
  console.log('working on refresh code: ', usercode)
  
  return axios.post("https://api.coinbase.com/oauth/token", {
    grant_type: 'refresh_token',
    client_id: COINBASE_KEYS.COINBASE_CLIENT_ID,
    client_secret: COINBASE_KEYS.COINBASE_SECRET,
    refresh_token: refreshToken
  })
  .then(function (response) {
    console.log('the response data is:', response.data);
    callback(response.data)
    // getClient(response.data.access_token, response.data.refresh_token)
  })
  .catch(function (error) {
    console.log('fail: ', error)
  });
}

module.exports = {getAccessToken, getClient, getWallet, getRefreshToken, buyCoin}