const axios = require('axios');
const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');
const coinbaseController = require('./controllers/coinbaseController.js');
const firebaseController = require('./controllers/firebaseController.js');
const emailController = require('./controllers/emailController.js')

router.post('/get_access_token', plaidController.get_access_token.post);
router.get('/accounts', plaidController.accounts.get);
router.post('/accounts', plaidController.accounts.post);
router.post('/transactions', plaidController.transactions.post);
router.post('/unlinkplaid', plaidController.unlinkPlaid.post);

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
    
    firebaseController.checkDB(userid, '/coinbaseinfo', function(result){
      if (result === "true"){
        firebaseController.coinAuthRefresh(userid, function(updatekeys){
          coinbaseController.getRefreshToken(userid, updatekeys, function(newkey){
            firebaseController.saveCoinAuth(userid, newkey.access_token, newkey.refresh_token, newkey.scope)
            coinbaseController.getWallet(userid, newkey.access_token, newkey.refresh_token, function(coincount){
              res.send(coincount)
            })
          })
        });
      } else {
        res.send({})
      }
    })
  })

router.post('/purchasecoin', (req, res) => {
    var userid = req.body.useruid
    var amount = req.body.amount

    firebaseController.coinAuthRefresh(userid, function(updatekeys){
      coinbaseController.getRefreshToken(userid, updatekeys, function(newkey){
        firebaseController.saveCoinAuth(userid, newkey.access_token, newkey.refresh_token, newkey.scope)
        coinbaseController.buyCoin(userid, newkey.access_token, newkey.refresh_token, function(coincount){
          res.send(coincount)
        })
      })
    });
  })


//This path is responsible for handling coinbase usercodes
//This needs to be cleaned up
router.get('/account', (req, res) => {
  
  console.log(req._parsedOriginalUrl.query.length)

  if (req._parsedOriginalUrl.query){
    if (req._parsedOriginalUrl.query.length === 69){
      let usercode = req._parsedOriginalUrl.query.split('=')[1];
      // console.log('now handing the secret code to the server')
      // console.log(usercode)
      res.redirect(`/#/account/${usercode}`)
    }
  } 
  else {
    res.redirect('/#/account/')
  }
})

module.exports = router;