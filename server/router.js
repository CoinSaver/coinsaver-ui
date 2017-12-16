const axios = require('axios');
const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');
const coinbaseController = require('./controllers/coinbaseController.js');
const firebaseController = require('./controllers/firebaseController.js');
const emailController = require('./controllers/emailController.js')

router.post('/get_access_token', plaidController.get_access_token.post);
router.get('/accounts', plaidController.accounts.get);
router.get('/transactions', plaidController.transactions.get);

router.post('/verifybase', (req, res) => {

  var verifycode = req.body.code
  var userid = req.body.useruid

  console.log('the code is:', verifycode)

  // NEED RICHARDS HELP MAKING A PROMISE

  coinbaseController.getAccessToken(req.body.code, function(token){
    console.log('working on a token that is: ', token);
    firebaseController.saveCoinAuth(userid, token.access_token, token.refresh_token, token.scope)
  })

  res.send(req.body)

})

router.post('/retrievewallet', (req, res) => {
  
    var userid = req.body.useruid

    firebaseController.coinAuthRefresh(userid, function(updatekeys){
      coinbaseController.getRefreshToken(userid, updatekeys, function(newkey){
        firebaseController.saveCoinAuth(userid, newkey.access_token, newkey.refresh_token, newkey.scope)
        coinbaseController.getWallet(userid, newkey.access_token, newkey.refresh_token, function(coincount){
          res.send(coincount)
        })
      })
    });
  
    // // coinbaseController.getAccessToken(req.body.code, function(token){
    // //   console.log('working on a token that is: ', token);
    // //   firebaseController.coinAuthUser(userid, token.access_token, token.refresh_token, token.scope)
    // // })
  
    // res.send(req.body)
  
  })

//This path is responsible for handling coinbase usercodes
router.get('/account', (req, res) => {
  
  console.log(req._parsedOriginalUrl.query.length)

  if (req._parsedOriginalUrl.query){
    if (req._parsedOriginalUrl.query.length === 69){
      let usercode = req._parsedOriginalUrl.query.split('=')[1];
      
      console.log('now handing the secret code to the server')
      console.log(usercode)
      
        res.redirect(`/#/account/${usercode}`)
        
    }
  } 
  else {
    res.redirect('/#/account/')
  }

})

router.get('/verified', (req, res) =>{
  console.log('the code is', req.data);
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