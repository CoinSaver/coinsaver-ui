const plaid = require('plaid');
const moment = require('moment');
const fs = require('fs');
const PLAID_KEYS = require('../../config/config.js').plaidAPI;
const plaidHelper = require('./plaidHelper.js');
const firebaseController = require('./firebaseController.js');

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

        const updateObj = {
          plaid_account_id: '',
          plaid_user_id: accessToken,
        };

        firebaseController.updateFB(req.body.uid, '/plaidinfo', 'plaid_user_id', accessToken);

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
    post: function postAccount(req, res, next) {
      firebaseController.updateFB(req.body.uid, '/plaidinfo', 'plaid_account_id', req.body.i);
      firebaseController.updateFB(req.body.uid, '/userinfo', 'stats_last_purchase_date', moment().subtract(1, 'months').format('YYYY-MM-DD'));
      res.json({ error: false });
    },
  },

  transactions: {
    post: function getTransactions(req, res, next) {
      let startDate = 0;
      const endDate = moment().format('YYYY-MM-DD');
      firebaseController.fetchDB(req.body.uid, '/userinfo', (info) => {
        startDate = info.stats_last_purchase_date;

        firebaseController.fetchPlaidInfo(req.body.uid, (plaidInfoObj) => {

          client.getTransactions(plaidInfoObj.plaid_user_id, startDate, endDate, {
            count: 250,
            offset: 0,
          }, (error, transactionsResponse) => {
            if (error) {
              console.log('Could not get transactions: ', error);
              return res.json({ error });
            }

            const transactions = plaidHelper.formatTransactions(transactionsResponse, plaidInfoObj.plaid_account_id);
            console.log('^^^^^^transactions', parseFloat(parseFloat(transactions[0].roundSum).toFixed(2)));
            firebaseController.updateFB(req.body.uid, '/userinfo', 'transactions', transactions);
            firebaseController.updateFB(req.body.uid, '/userinfo', 'linked_plaid', true);
            firebaseController.updateFB(req.body.uid, '/userinfo', 'stats_next_purchase_date', moment().add(1, 'months').format('YYYY-MM-DD'));
            firebaseController.updateFB(req.body.uid, '/userinfo', 'stats_next_purchase_usd', parseFloat(parseFloat(transactions[0].roundSum).toFixed(2)));
            return res.json(transactions);
          });
        });
      });
    },
  },

  unlinkPlaid: {
    post: function unlinkPlaid(req, res, next) {
      firebaseController.updateFB(req.body.uid, '/plaidinfo', 'plaid_account_id', '');
      firebaseController.updateFB(req.body.uid, '/plaidinfo', 'plaid_user_id', '');
      firebaseController.updateFB(req.body.uid, '/userinfo', 'stats_last_purchase_date', '');
      firebaseController.updateFB(req.body.uid, '/userinfo', 'stats_next_purchase_date', '');
      firebaseController.updateFB(req.body.uid, '/userinfo', 'linked_plaid', false);
      firebaseController.updateFB(req.body.uid, '/userinfo', 'transactions', 0);
      res.send();
    },
  },

  // ***************** NOT FOR API ENDPOINTS ***************** //
  // The functions below are to be used by the cronworker and  //
  // are written in this file to prevent multiple instances of //
  // plaid.Client being created.                               //
  // ********************************************************* //

  
};
