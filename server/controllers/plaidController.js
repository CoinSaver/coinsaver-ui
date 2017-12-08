const plaid = require('plaid');
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
};
