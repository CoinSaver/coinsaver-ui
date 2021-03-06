const axios = require('axios');
const router = require('express').Router();
const plaidController = require('./controllers/plaidController.js');
const coinbaseController = require('./controllers/coinbaseController.js');
const firebaseController = require('./controllers/firebaseController.js');
const emailController = require('./controllers/emailController.js');
const emailSignup = require('./controllers/emailTemplates/emailSignup.js');

router.post('/get_access_token', plaidController.get_access_token.post);
router.get('/accounts', plaidController.accounts.get);
router.post('/accounts', plaidController.accounts.post);
router.post('/transactions', plaidController.transactions.post);
router.post('/unlinkplaid', plaidController.unlinkPlaid.post);

router.post('/verifybase', (req, res) => {
  var verifycode = req.body.code
  var userid = req.body.useruid

  // console.log('the code is:', verifycode)
  // NEED RICHARDS HELP MAKING A PROMISE
  coinbaseController.getAccessToken(req.body.code, function(token){
    // console.log('working on a token that is: ', token);
    firebaseController.saveCoinAuth(userid, token.access_token, token.refresh_token, token.scope)
  })
  res.send(req.body)
})


// -- User Setup -- //
router.post('/usersetup', (req, res) => {
  // console.log('/usersetup post received')
  // console.log('/usersetup req.body: ', req.body.currentuser)

  var new_userid = req.body.currentuser.uid
  var new_display_name = req.body.currentuser.displayName;
  var new_email = req.body.currentuser.email;

  firebaseController.setupNewUserFB(new_userid, new_display_name, new_email)

  var firstname = new_display_name.split(' ')[0];
  // console.log('firstname: ', firstname)



  emailSignup.to = new_email;
  emailSignup.subject = `Welcome to Coinsaver, ${firstname}! Here's how to get started`;

  // console.log('emailSignup Obj: ', emailSignup)
  emailController.sendCoinsaverbotEmail(emailSignup);

  res.send('Server Response: New User setup completed');
})
// -- End User Setup -- //

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
  // console.log('entering some coin logic stuff')
  // console.log(req._parsedOriginalUrl.query.length)

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