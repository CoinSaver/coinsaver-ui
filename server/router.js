const axios = require('axios');
const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');

router.post('/get_access_token', plaidController.get_access_token.post);
router.get('/accounts', plaidController.accounts.get);
router.get('/transactions', plaidController.transactions.get);

router.get('/tokens', (req, res) => {
  axios.get("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Fwww.localhost%3A9001&response_type=code&scope=wallet%3Auser%3Aread&account=all")
    .then((result) => {
      const data = result.data
      console.log(data)
      res.send(data)
    })
  
  })

module.exports = router;