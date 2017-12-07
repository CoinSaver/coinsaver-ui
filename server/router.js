const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');

router.post('/get_access_token', plaidController.get_access_token.post);

module.exports = router;
