const plaid = require('plaid');
const moment = require('moment');
const fs = require('fs');
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


      // Use below when deploying
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

        const resObj = [];
        const indexTrack = {};

        for (let i = 0; i < transactionsResponse.accounts.length; i++) {
          if (transactionsResponse.accounts[i].subtype === 'checking') {
            const accObj = {
              id: transactionsResponse.accounts[i].account_id,
              name: transactionsResponse.accounts[i].name,
              type: transactionsResponse.accounts[i].subtype,
              transactions: [],
              roundSum: 0,
              totalSum: 0,
            };
            // resObj.accounts.push(accObj);
            // resObj.accounts.transactions = [];
            resObj.push(accObj);

            // indexTrack just keeps track of which index in resObj array
            // stores which account_id's information for quicker lookup
            indexTrack[accObj.id] = resObj.length - 1;
          }
        }
        // console.log('------', resObj);
        console.log('-------TRANSACTIONS', transactionsResponse.transactions[0]);

        for (let i = 0; i < transactionsResponse.transactions.length; i++) {
          const temp = transactionsResponse.transactions[i];

          // If current transaction is for an account in our indexTrack
          // it means this transactions is for a valid account
          if (indexTrack[temp.account_id] !== undefined) {
            const transactionObj = {
              amount: temp.amount,
              round: Math.ceil(temp.amount) - temp.amount,
              date: temp.date,
              location: {
                city: temp.location.city,
              },
              name: temp.name,
            };
            resObj[indexTrack[temp.account_id]].transactions.push(transactionObj);
            resObj[indexTrack[temp.account_id]].totalSum += transactionObj.amount;
            if (transactionObj.amount > 0) {
              resObj[indexTrack[temp.account_id]].roundSum += transactionObj.round;
            }
          }
        }

        console.log(`Pulled ${transactionsResponse.transactions.length} transactions`);
        console.log('-----', resObj);
        res.json(resObj);
      });
    },
  },
};
