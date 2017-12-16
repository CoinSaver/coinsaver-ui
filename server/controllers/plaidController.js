const plaid = require('plaid');
const moment = require('moment');
const fs = require('fs');
const PLAID_KEYS = require('../../config/config.js').plaidAPI;
const plaidHelper = require('./plaidHelper.js');

let accessToken = '';
let publicToken = '';
let itemId = '';

// Initializes plaid client
const client = new plaid.Client(
  PLAID_KEYS.PLAID_CLIENT_ID,
  PLAID_KEYS.PLAID_SECRET,
  PLAID_KEYS.PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_KEYS.PLAID_ENV]
);

module.exports = {
  get_access_token: {
    post: function getAccessTokenFunction(req, res, next) {
      ({ publicToken } = req.body);

      client.exchangePublicToken(publicToken, (e, tokenResponse) => {
        if (e) {
          console.warn('Could not exchange public token: ', e);
          res.json({ error: 'Could not exchange public token' });
        }
        accessToken = tokenResponse.access_token;
        itemId = tokenResponse.item_id;
        console.log('------Access token: ', accessToken);
        console.log('------Item ID: ', itemId);

        res.json({ error: false });
      });
    },  
  },

  accounts: {
    get: function getAccounts(req, res, next) {
      client.getAuth(accessToken, (error, authResponse) => {
        if (error) {
          console.warn('Could not retrieve accounts: ', error);
          res.json({ error });
        }

        console.log(authResponse.accounts);

        const resArray = [];

        for (let i = 0; i < authResponse.accounts.length; i++) {
          if (authResponse.accounts[i].subtype === 'checking') {
            resArray.push({
              accountId: authResponse.accounts[i].account_id,
              balance: authResponse.accounts[i].balances.current,
              name: authResponse.accounts[i].name,
              officialName: authResponse.accounts[i].official_name,
              type: authResponse.accounts[i].subtype,
            });
          }
        }

        res.json({
          error: false,
          accounts: resArray,
        });
      });
    },
  },

  transactions: {
    get: function getTransactions(req, res, next) {

      // Use below for testing to avoid excessive plaid calls
      // fs.readFile('./seed.json', 'utf8', (err, data) => {
      //   if (err) {
      //     console.log(err);
      //     res.send(err);
      //   }
      //   const transactionsArray = JSON.parse(data);
      //   const resObj = [];
      //   for (let i = 0; i < transactionsArray.length; i++) {
      //     if (transactionsArray[i].type === 'checking') {
      //       resObj.push(transactionsArray[i]);
      //     }
      //   }
      //   res.json(resObj);
      // });


      // ******* Use below when deploying *******

      const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      const endDate = moment().format('YYYY-MM-DD');
      client.getTransactions(accessToken, startDate, endDate, {
        count: 250,
        offset: 0,
      }, (error, transactionsResponse) => {
        if (error) {
          console.log('Could not get transactions: ', error);
          return res.json({ error });
        }

        res.json(plaidHelper.formatTransactions(transactionsResponse));
      });
    },
  },

  // ***************** NOT FOR API ENDPOINTS ***************** //
  // The functions below are to be used by the cronworker and  //
  // are written in this file to prevent multiple instances of //
  // plaid.Client being created.                               //
  // ********************************************************* //

  
};
