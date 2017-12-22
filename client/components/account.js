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
      {
        transaction: null,
        user_reference: 'ZDEWMXFH',
        created_at: '2017-12-22T01:01:36Z',
        updated_at: '2017-12-22T01:01:36Z',
        fee: { amount: '0.99', currency: 'USD' },
        amount: { amount: '0.03294239', currency: 'BTC' },
        total: { amount: '10.99', currency: 'USD' },
        subtotal: { amount: '10.00', currency: 'USD' },
        imgurl: './images/btcround.svg'
      },
      {
        transaction: null,
        user_reference: 'ZDEWMXFH',
        created_at: '2017-12-21T01:01:36Z',
        updated_at: '2017-12-21T01:01:36Z',
        fee: { amount: '0.99', currency: 'USD' },
        amount: { amount: '0.016471195', currency: 'BTC' },
        total: { amount: '5.99', currency: 'USD' },
        subtotal: { amount: '5.00', currency: 'USD' },
        imgurl: './images/btcround.svg'
      },
      {
        transaction: null,
        user_reference: 'ZDEWMXFH',
        created_at: '2017-12-20T01:01:36Z',
        updated_at: '2017-12-20T01:01:36Z',
        fee: { amount: '0.99', currency: 'USD' },
        amount: { amount: '0.005217133', currency: 'ETH' },
        total: { amount: '5.99', currency: 'USD' },
        subtotal: { amount: '5.00', currency: 'USD' },
        imgurl: './images/ethround.svg'
      },
      {
        transaction: null,
        user_reference: 'ZDEWMXFH',
        created_at: '2017-12-21T01:01:36Z',
        updated_at: '2017-12-21T01:01:36Z',
        fee: { amount: '0.99', currency: 'USD' },
        amount: { amount: '0.005352631', currency: 'ETH' },
        total: { amount: '5.99', currency: 'USD' },
        subtotal: { amount: '5.00', currency: 'USD' },
        imgurl: './images/ethround.svg'
      },
      {
        transaction: null,
        user_reference: 'ZDEWMXFH',
        created_at: '2017-12-15T01:01:36Z',
        updated_at: '2017-12-15T01:01:36Z',
        fee: { amount: '0.99', currency: 'USD' },
        amount: { amount: '0.004922831', currency: 'ETH' },
        total: { amount: '5.99', currency: 'USD' },
        subtotal: { amount: '5.00', currency: 'USD' },
        imgurl: './images/ethround.svg'
      },
      {
        transaction: null,
        user_reference: 'ZDEWMXFH',
        created_at: '2017-12-15T01:01:36Z',
        updated_at: '2017-12-15T01:01:36Z',
        fee: { amount: '0.99', currency: 'USD' },
        amount: { amount: '0.000156497', currency: 'BTC' },
        total: { amount: '2.99', currency: 'USD' },
        subtotal: { amount: '2.00', currency: 'USD' },
        imgurl: './images/btcround.svg'
      },
      
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
            <md-card md-theme="{{ showDarkTheme ? 'dark-purple' : 'default' }}" md-theme-watch style="min-width:240px">
              <md-card-title>
                <md-card-title-text>
                  <span class="md-headline">Bitcoin</span>
                  <span class="md-subhead">{{"BTC"}}</span>
                </md-card-title-text>
                <md-card-title-media>
                  <div class="md-media-sm card-media"> <img src="./images/btcround.svg" width="80" height= "80" alt="Bitcoin" style="padding-left:4px; margin-top:-4px"></div>
                </md-card-title-media>
              </md-card-title>
              <md-card-actions layout="row" layout-align="end center">
                <span class="md-subhead">{{$ctrl.wallet["BTC Wallet"]}}</span>
              </md-card-actions>
            </md-card>
        </div>
          <div flex="3"></div>
        <div>
            <md-card md-theme="{{ showDarkTheme ? 'dark-purple' : 'default' }}" md-theme-watch style="min-width:240px">
              <md-card-title>
                <md-card-title-text>
                  <span class="md-headline">Litecoin</span>
                  <span class="md-subhead">{{"LTC"}}</span>
                </md-card-title-text>
                <md-card-title-media>
                  <div class="md-media-sm card-media"> <img src="./images/ltcround.svg" width="80" height= "80" alt="Litecoin" style="padding-left:4px; margin-top:-4px"></div>
                </md-card-title-media>
              </md-card-title>
              <md-card-actions layout="row" layout-align="end center">
                <span class="md-subhead">{{$ctrl.wallet["LTC Wallet"]}}</span>
              </md-card-actions>
            </md-card>
        </div>
          <div flex="3"></div>
        <div>
          <md-card md-theme="{{ showDarkTheme ? 'dark-purple' : 'default' }}" md-theme-watch style="min-width:240px">
              <md-card-title>
                <md-card-title-text>
                  <span class="md-headline">Ethereum</span>
                  <span class="md-subhead">{{"ETH"}}</span>
                </md-card-title-text>
                <md-card-title-media>
                  <div class="md-media-sm card-media"> <img src="./images/ethround.svg" width="80" height= "80" alt="Etheriem" style="padding-left:4px; margin-top:-4px"></div>
                </md-card-title-media>
              </md-card-title>
              <md-card-actions layout="row" layout-align="end center">
                <span class="md-subhead">{{$ctrl.wallet["BTC Wallet"]}}</span>
              </md-card-actions>
            </md-card>
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
        <div flex="20"></div>
        <div flex="60" style="margin-bottom:30px">

        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2 flex md-truncate>Transactions</h2>
          </div>
        </md-toolbar>

          <md-content>
          <md-list>
            <md-list-item flex class="md-2-line transactionitem" layout="row" ng-repeat="item in $ctrl.receipts" style="overflow-x: hidden;">

                <div class="md-list-item-text">
                  <p>{{item.created_at.split('T0')[0]}}</p>
                  <p>$ {{ item.subtotal.amount }} {{ item.subtotal.currency}}  >  {{item.amount.currency}}</p>
                </div>

                <div layout="column">
                  <div class="md-secondary"  style="margin-right:10px">{{item.amount.amount.substring(0,8)}} {{item.amount.currency}} </div>
                </div>

                <div layout="column" class="md-secondary" style="margin-right:-26px">
                  <img data-ng-src="{{item.imgurl}}" alt="Coin" class="md-avatar" style="margin-top:8px"/>
                </div>

                <md-divider class="transactiondivider"></md-divider>
              
              </md-list-item>
            </md-list>
          </md-content>

        </div>
        <div flex="20"></div>
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
