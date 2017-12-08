const plaid = require('plaid');
const moment = require('moment');
const PLAID_KEYS = require('../../config/config.js').plaidAPI;

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
        res.json({
          error: false,
          accounts: authResponse.accounts,
          // numbers: authResponse.numbers,
        });
      });
    },
  },

  transactions: {
    get: function getTransactions(req, res, next) {
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

        console.log(`Pulled ${transactionsResponse.transactions.length} transactions`);
        res.json(transactionsResponse.transactions);
      })
    }
  },
};
