angular.module('coinsaver')
.component('account', {
  bindings: {
  },
  controller($http, $mdDialog) {

    this.getCoinapi = function() {
      console.log('ding')
      const getRequest = () => {
        $http({
          method: 'GET',
          url: "/tokens",
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          //   'Access-Control-Allow-Methods': ['GET, POST, PUT, DELETE', 'OPTIONS']
          // },
        }).then((result) => {
          let res = result.data
          console.log(res)
          let newWindow = open('/', 'example', 'width=300,height=300')
          newWindow.focus();
          
          newWindow.onload = function() {
            let html = `<div style="font-size:30px">Welcome!</div>`;
            newWindow.document.body.insertAdjacentHTML('afterbegin', res);
          };
        })
      
      }
      // var coinlink = window.open("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Flocalhost%3A9001&response_type=code&scope=wallet%3Auser%3Aread&account=all", "Coinbase Connection", "width=600")
      window.location.replace("https://www.coinbase.com/oauth/authorize?client_id=f9d7e163baa378a50f4c65602294b21b59a8ec5043e2f17eefcf52cd401d5e1d&redirect_uri=http%3A%2F%2Flocalhost%3A9001&response_type=code&scope=wallet%3Auser%3Aread&account=all")
      // getRequest();
    };
    
  },

  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Methods', ['GET, POST, PUT, DELETE', 'OPTIONS'])
  template: `
  <div>
    This line is written in the account.js component;

    This button does everything:

    <md-button md-autofocus class="md-primary" flex ng-click="$ctrl.getCoinapi()">
      The Work Button
    </md-button>

  </div>
`,
});
