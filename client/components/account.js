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

    this.receipts = [
      ]

    this.$onInit = () => {

      // console.log('the current auth is', currentAuth)

      Auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          coinacct.user = firebaseUser;
          coinacct.loggedIn = true;
          coinacct.testcoincode(coinacct.user.uid)
          coinacct.getcoinwallet(coinacct.user.uid)
          console.log(coinacct.receipts)
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
      window.location.replace("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Flocalhost%3A9001%2Faccount%2F&response_type=code&scope=wallet:user:read,wallet:buys:create,wallet:buys:read,wallet:payment-methods:read,wallet:accounts:read&account=all")
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



    <div ng-if="$ctrl.connected == true">

          <div layout="row" layout-align="center center">
            <md-button class="md-raised md-primary" style="min-width:300px" ng-click="$ctrl.buyCoin(10.00, $ctrl.user.uid)">
              Buy some Coin!!
            </md-button>
          </div>

      <div layout="row" layout-xs="column" layout-align="center center">
        <div>
          <center>    
            <img src="./images/btcround.svg" width="150" height= "150" alt="Bitcoin">
            <br>
              {{$ctrl.wallet["BTC Wallet"].substring(0,7)}} 
            <br> Bitcoin
          </center>
        </div>
          <div flex="5"></div>
        <div>
          <center>
            <img src="./images/ltcround.svg" width="150" height= "150"alt="Litecoin">
            <br>
              {{$ctrl.wallet["LTC Wallet"].substring(0,7)}}
              <br> Litecoin
          </center>
        </div>
          <div flex="5"></div>
        <div>
          <center>
            <img src="./images/ethround.svg" width="150" height= "150" alt="Etherium">
            <br>
            {{$ctrl.wallet["ETH Wallet"].substring(0,7)}} 
            <br> Ethereum
          </center>
        </div>
      </div>
    </div>
    <!--<div>
      <md-button md-autofocus class="md-primary" flex ng-click="$ctrl.buyCoin(5, $ctrl.user.uid)">
        Buy $5 BTC
      </md-button>
    </div>-->

    <div ng-if="$ctrl.receipts.length>0">
      <div layout="row" layout-wrap>
        <div flex="20" style="text-align:right!important">
          ]
        </div>
        <div flex="60">

        <md-content>
        <md-list flex>
          <md-list-item class="md-3-line" ng-repeat="item in $ctrl.receipts">
            <div layout="column">
              <img src="./images/ltcround.svg" alt="Litecoin" class="md-avatar" style="margin-top:10px"/>
            </div>
            <div class="md-list-item-text" layout="column">
              <h3>{{ item.amount.currency }}</h3>
              <h3>{{ item.amount.amount }}</h3>
            </div>
            <div class="md-list-item-text" layout="column">
              <p>{{item.created_at.split('T0')[0]}}
              {{item.created_at.split('T0')[1].split('Z')[0]}}</p>
            </div>
            <div class="md-list-item-text" layout="column">
              <h3>{{ item.subtotal.currency}}</h3>
              <h3>$ {{item.subtotal.amount}}</h3>
            </div>
          </md-list-item>
        </md-list>
      </md-content>

        </div>
        <div flex="20">
          [
        </div>
      </div>
    </div>




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
