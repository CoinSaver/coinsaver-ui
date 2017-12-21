angular.module('coinsaver')
.component('account', {
  bindings: {

  },
  controller($http, $mdDialog, $cookies, $firebaseObject, Auth, User) {

    let coinacct = this;

    this.loggedIn = false;
    this.connected = false;
    this.coinlink = false;
    this.user = User.get();
    this.wallet = {};

    this.$onInit = () => {

      // console.log('the current auth is', currentAuth)

      Auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          coinacct.user = firebaseUser;
          coinacct.loggedIn = true;
          coinacct.testcoincode(coinacct.user.uid)
          coinacct.getcoinwallet(coinacct.user.uid)
        } else {
          console.log("Not currently signed in");
        }
      });
    }
    
    this.testcoincode = function (useruid){
      if (window.location.href.length === 96 && window.location.href.includes('/account')){
        var code = window.location.href.slice(window.location.href.length-64, window.location.href.length)
        console.log('processing code for: ', code)

        $http.post('/verifybase', { code , useruid })
        .then((res) => {
          console.log('Successful post to exchange tokens!', res);
        });
        window.location.replace('http://localhost:9001/#/account/home')
      }
    }

    this.getcoinwallet = (useruid) => {
      console.log('getting wallet right')
      $http.post('/retrievewallet', { useruid })
      .then((res) => {
        coinacct.wallet = res.data;
        if (Object.keys(coinacct.wallet).length !== 0 && coinacct.wallet.constructor === Object) coinacct.connected = true;
      });
    }

    this.buyCoin = (amount, useruid) => {
      $http.post('/purchasecoin', { amount , useruid })
      .then((res) => {
        console.log('Successful purchase post to /purchasecoin!!', res);
      });
    }

    //BUTTONS 

    this.linkCoinbase = function() {
      window.location.replace("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Flocalhost%3A9001%2Faccount%2F&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all")
    };

    this.newCoinbase = function(){
      window.open("https://www.coinbase.com/join/5a2ed616e0226602a21850e2")
    }

  },

  template: `
  <div>

    <br><br>

    <div layout="row" ng-if="$ctrl.connected == false">
      <div flex></div>
        <md-button class="md-raised md-primary" style="min-width:300px" ng-click="$ctrl.linkCoinbase()">
          Link A Coinbase Account
        </md-button>
        <md-button class="md-raised md-primary" style="min-width:300px" ng-click="$ctrl.linkCoinbase()">
          Connect A Coinbase Account
        </md-button>
      <div flex></div> 
    </div>

    <div layout="row" layout-xs="column" ng-if="$ctrl.connected == true">
      <div flex="20"></div>
        <div flex="20">    
          <center>    
            <img src="./images/btcround.svg" width="150" height= "150" alt="Bitcoin">
            <br>
            {{$ctrl.wallet["BTC Wallet"]}} 
            <br> Bitcoin
          </center>
        </div>
        <div flex="20">
          <center>
            <img src="./images/ltcround.svg" width="150" height= "150"alt="Litecoin">
            <br>
            {{$ctrl.wallet["LTC Wallet"]}}
            <br> Litecoin
          </center>
        </div>
        <div flex="20">
          <center>
            <img src="./images/ethround.svg" width="150" height= "150" alt="Etherium">
            <br>
            {{$ctrl.wallet["ETH Wallet"]}} 
            <br> Ethereum
          </center>
        </div>
      <div flex="20"></div>
    </div>

    <!--<div>
      <md-button md-autofocus class="md-primary" flex ng-click="$ctrl.buyCoin(5, $ctrl.user.uid)">
        Buy $5 BTC
      </md-button>
    </div>-->

  </div>
`,
});


// this.checkcoinbase = function(){

    //   console.log('checking for coinbase creds')

    //   setTimeout(function(){ 
    //     var ref = firebase.database().ref('users/' + Auth.$getAuth().uid + '/coinbaseinfo');
        
    //     ref.once("value", snapshot => {
    //       const db = snapshot.val();
    //       if (db){
    //         if (db.credentials === 'valid'){
    //           coinacct.coinlink = true;
    //           coinacct.getcoinwallet(Auth.$getAuth().uid)
    //         }
    //       } else {
    //         // ctrl.writefbUser('works','true')
    //         console.log('Is your database currently empty? Try linking a google account')
    //       }
    //     })   
    //   }, 500);
    // }
    
    // this.firebaseUpdate = function (property, value, path) {
    //   var ref = firebase.database().ref('users/' + Auth.$getAuth().uid + path);
    //   var obj = {};
    //   obj[property] = value;
    //   ref.update(obj)
    // }

    // this.testcoincode = function (){
    //   if (window.location.href.length === 96 && window.location.href.includes('/account/')){
    //     console.log('going into code processing logic!!')
    //     var urlcode = window.location.href.slice(window.location.href.length-64, window.location.href.length)
    //     console.log('the code url is: ', urlcode)
    //     // return coinacct.redirectCode(urlcode)
    //     setTimeout(function(){
    //       coinacct.writefbcoincode('coinbasetempcode', urlcode);
    //       coinacct.redirectCode(urlcode, Auth.$getAuth().uid);
    //     }, 2000)
    //   }
    // }

    // this.writefbcoincode = function (property, value) {
    //   coinacct.firebaseUpdate(property, value, '/coinbaseinfo')
    // } 

