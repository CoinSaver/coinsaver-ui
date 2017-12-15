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
  
  if (req._parsedOriginalUrl.length){

  let usercode = req._parsedOriginalUrl.query.split('=')[1];
  res.redirect('/#/account/' + usercode)
  
  } else {
    res.redirect('/#/account/')
  }

<<<<<<< HEAD
  console.log('now handing the secret code to the server')
  console.log(usercode)

  res.redirect(`/#/account/${usercode}`)
  
  } else {
    res.redirect('/#/account/')
  }

})

router.get('/verified', (req, res) =>{
  console.log(req.data);
  res.send('hello')
})

=======
})

router.get('/verified', (req, res) =>{
  console.log(req.data);
  res.send('hello')
})

>>>>>>> f8990f379c5b2e0b93c478eb3a25ef52846ab6b1
module.exports = router;


// router.get('/tokens', (req, res) => {
//   axios.get("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Fwww.localhost%3A9001%2Fverifybase&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all")
//     .then((result) => {
//       const data = result.data
//       console.log(data)
//       res.send(data)
//     })
//   })