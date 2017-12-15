const axios = require('axios');
const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');
const coinbaseController = require('./controllers/coinbaseController.js');

router.post('/get_access_token', plaidController.get_access_token.post);
router.get('/accounts', plaidController.accounts.get);
router.get('/transactions', plaidController.transactions.get);


router.post('/verifybase', (req, res) => {

  console.log(req.body)

  res.send(req.body)

  // console.log('now attempting to get access token')
  // coinbaseController.getAccessToken(usercode)
  //   .then((response)=>{
  //       console.log('response is: ', response)
  //       res.send(response)
  //     res.redirect('/#/account/' + usercode)
  //   })
    // console.log('the token is: ', token)
  // res.redirect('/#/account')



  // res.redirect('/#/account')
  // res.send('hello')
})

router.get('/account', (req, res) => {

  let usercode = req._parsedOriginalUrl.query.split('=')[1];
  
  res.redirect('/#/account/' + usercode)
  
})

router.get('/verified', (req, res) =>{
  console.log(req.data);
  res.send('hello')
})

module.exports = router;


// router.get('/tokens', (req, res) => {
//   axios.get("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Fwww.localhost%3A9001%2Fverifybase&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all")
//     .then((result) => {
//       const data = result.data
//       console.log(data)
//       res.send(data)
//     })
//   })