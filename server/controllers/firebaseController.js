const admin = require("firebase-admin");
const serviceAccount = require('../../config/firebaseconfig.json');
const moment = require('moment');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coinsaverapp.firebaseio.com"
});

var auth = admin.auth();
var db = admin.database();

//!!This function prints your entire DB of a specific path to the console!!

var printDB = function(path){
  var dbpath = db.ref(path);

  dbpath.once("value", snapshot => {
    const db = snapshot.val();
    if (db){
      console.log('Your current database is: ', db);
    } else {
      // ctrl.writefbUser('works','true')
      console.log('Is your database currently empty? Try linking a google account')
    }
  })  
}

//!!This is an example of printDB in action!!

// printDB('/users')

//!!This function updates a single property, below is an example of using it to update my user info's name to huckabee

var updateFB = function(userid, path, property, value){
  var userpath = db.ref('users/' + userid + path)
  // console.log(userpath)
  const updateObj = {};
  updateObj[property] = value;

  userpath.update(updateObj);
}

//!!This is an example of updateFB in action!!

// updateFB('bpc2buxD1DTtSWo3zDcrk1oFXY72', '/userinfo', 'name', 'huckabee')


//! This functions returns whether or not there is data/ a file in a specific filepath.

var checkDB = function(userid, path, callback){  
  var dbpath = db.ref('users/' + userid + path);

  dbpath.once("value", snapshot => {
    const db = snapshot.val();
    if (db){
      callback("true")
    } else {
      callback("false")
    }
  })
}


//!! Setup Intiial Values in Firebase
var setupNewUserFB = function(userid, display_name, email){
  console.log('setupNewUserFB ran')
  var userinfopath = db.ref('users/' + userid + '/userinfo')
  var currentTime = new Date().toLocaleString();
  console.log('current time is: ', currentTime);

  userinfopath.update({
    // userinfo
    display_name: display_name || '',
    email: email || '',
    user_level: 0, //0 = FreeAccess, 1 = NewCoinbaseUser, 2 = PremiumAccess
    user_type: 'free', // Free, Premium, Etc
    user_signup_date: currentTime, // *Make it today
    is_new_coinbase_user: false, 
    linked_plaid: false,       
    stats_last_purchase_usd: 0,
    stats_last_purchase_eth: 0,
    stats_past_purchase_btc: 0,
    stats_total_purchase_usd: 0,
    stats_total_purchase_eth: 0,
    stats_total_purchase_btc: 0,
    stats_last_purchase_date: moment().format('YYYY-MM-DD'),
    stats_next_purchase_date: '',
    stats_next_purchase_usd: 0,
    transactions: 0, 
  });
  
  var plaidinfopath = db.ref('users/' + userid + '/plaidinfo')
  plaidinfopath.update({
    //// plaidinfo
    plaid_user_id: '',
    plaid_account_id: '',
    
  })
}
//!!  Example SetupNewUser
// setupNewUserFB('UBnLrrSpCwSM6ianngmSqu9a8E73', 'Rich Oh', 'sioh89@gmail.com')




//!!! COINSAVER FUNCTIONS !!!

var saveCoinAuth = function(userid,access_token,refresh_token,scope){
  var userpath = db.ref('users/' + userid + '/coinbaseinfo')

  userpath.update({
    'access_token': access_token,
    'refresh_token': refresh_token,
    'scope': scope,
    'credentials' : 'valid'
  });
}

var coinAuthRefresh = function(userid, callback){
  var userpath = db.ref('users/' + userid + '/coinbaseinfo')
  
  userpath.once("value", snapshot => {
    const refreshToken = snapshot.val().refresh_token;
    if (refreshToken){
      // console.log('the refresh token is: ', refreshToken)
      callback(refreshToken);
    } else {
      // ctrl.writefbUser('works','true')
      console.log('Is your database currently empty? Try linking a google account')
    }
  })
};

const fetchPlaidInfo = (uid, callback) => {  
  const plaidKeyPath = db.ref(`users/${uid}/plaidinfo`);
  const plaidInfoPath = db.ref(`users/${uid}/userinfo`);
  let returnObj = {};
  
  plaidKeyPath.once("value", keySnapshot => {
    const keyData = keySnapshot.val();
    returnObj = JSON.parse(JSON.stringify(keyData));

    plaidInfoPath.once("value", infoSnapshot => {
      
      const infoData = infoSnapshot.val();

      returnObj.stats_last_purchase_date = infoData.stats_last_purchase_date;
      returnObj.stats_next_purchase_date = infoData.stats_next_purchase_date;
      returnObj.transactions = infoData.transactions;

      callback(returnObj);
    });
  });
};

const fetchDB = (uid, path, callback) => {
  const fetchPath = db.ref(`users/${uid}${path}`);

  fetchPath.once('value', fetchSnapshot => {
    callback(fetchSnapshot.val());
  });
};

module.exports = {updateFB, printDB, checkDB, fetchDB, setupNewUserFB, saveCoinAuth, coinAuthRefresh, fetchPlaidInfo}
