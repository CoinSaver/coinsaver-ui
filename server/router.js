const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');

router.post('/get_access_token', plaidController.get_access_token.post);
router.get('/accounts', plaidController.accounts.get);
router.get('/transactions', plaidController.transactions.get);

module.exports = router;
