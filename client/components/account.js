angular.module('coinsaver')
.component('account', {
  bindings: {

  },
  controller($http, $mdDialog, $cookies) {

    let coinacct = this;

    this.loggedIn = false;
    this.user = {}

    this.accounts = [];

    this.$onInit = () => {

      console.log(window.location.href.length)
      if (window.location.href.length === 96 && window.location.href.includes('/account/')){
        console.log('going into code processing logic!!')
        var currenturl = window.location.href.slice(window.location.href.length-64, window.location.href.length)
        console.log('the code url is: ', currenturl)
        return coinacct.getCoinacct(currenturl)
      }

      userCookie = $cookies.getObject('mycoinsaveruser'); 
      if (userCookie) {
        console.log(' rendering account cookies');
        coinacct.user = userCookie;
        coinacct.displayName = userCookie.displayName;
        coinacct.loggedIn = true; 
      }
      
    }

    this.getCoinacct = (code) => {
      $http.post('/verifybase', { code })
      .then((res) => {
        console.log('Successful post to exchange tokens!', res);
      });
    }


    this.getCoinacct1 = (code) => {
      console.log('getting a new Coinacct')    
        $http({
        method: 'POST',
        url: 'http://localhost:9001/verifybase',
        data: {
          code: code
        }
      }).then((response) =>{
        console.log('Get /verified success, ', response)
    //some action with response.data
      }), (err) => {
        console.log('Get /verified err', err)
      }
    }

    this.getCoinapi = function() {

      // var coinlink = window.open("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Flocalhost%3A9001&response_type=code&scope=wallet%3Auser%3Aread&account=all", "Coinbase Connection", "width=600")
      window.location.replace("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Flocalhost%3A9001%2Faccount%2F&response_type=code&scope=wallet%3Aaccounts%3Aread&account=all")
      // getRequest();
    };
    
  },

  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //res.header('Access-Control-Allow-Methods', ['GET, POST, PUT, DELETE', 'OPTIONS'])
  template: `
  <div>
    This line is written in the account.js component;

    <p>Click here to tie your coinbase account:</p>

    Please click here Mr. {{$ctrl.user.displayName}}

    <md-button md-autofocus class="md-primary" flex ng-click="$ctrl.getCoinapi()">
      The Work Button
    </md-button>

  </div>
`,
});

    // ===== LEGACY COIN LOGIC =====
    //   console.log('ding')
    //   const getRequest = () => {
    //     $http({
    //       method: 'GET',
    //       url: "/tokens",
    //       // headers: {
    //       //   'Access-Control-Allow-Origin': '*',
    //       //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //       //   'Access-Control-Allow-Methods': ['GET, POST, PUT, DELETE', 'OPTIONS']
    //       // },
    //     }).then((result) => {
    //       let res = result.data
    //       console.log(res)
    //       let newWindow = open('/', 'example', 'width=300,height=300')
    //       newWindow.focus();
          
    //       newWindow.onload = function() {
    //         let html = `<div style="font-size:30px">Welcome!</div>`;
    //         newWindow.document.body.insertAdjacentHTML('afterbegin', res);
    //       };
    //     })
      
    //   }
    //  ===== END LOGIC =====