angular.module('coinsaver')
  .component('banks', {
    bindings: {
    },
    controller: 'BankController',
    template: `
  <div>
      <md-button id="link-btn" class="md-raised md-primary" ng-if="$ctrl.linked===false" ng-click="$ctrl.checkClick()">Link A Bank Account</md-button>
      <div ng-if="$ctrl.linked===true">
        <p>Transactions go here</p>
      </div>
  </div>
`,
  })
  .controller('BankController', function bankControllerFunction($http, User) {
    const ctrl = this;

    this.linked = false;
    this.accounts = [];
    this.transactions = [];

    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'CoinSaver',
      env: 'sandbox',
      product: ['transactions'],
      key: 'a2467d682553b671fe4f51d29561a3',
      onSuccess: function handlerOnSuccess(publicToken) {
        console.log('plaid client created: public token', publicToken);
        $http.post('/get_access_token', { publicToken })
          .then((res) => {
            ctrl.linked = true;
            console.log('Successful post to exchange tokens!', res);

            // $http.get('/accounts')
            //   .then((res) => {
            //     console.log('Account data:');
            //     console.log(res.data.accounts);
            //     ctrl.accounts = res.data.accounts;
            //   });

            $http.get('/transactions')
              .then((res) => {
                console.log('User data:');
                console.log(res.data);
                ctrl.transactions = res.data.transactions;
              });
          });
      },
    });

    this.checkClick = () => {
      this.handler.open();
    };

    this.getAccountHandler = () => {
      $http.get('/accounts')
        .then((res) => {
          console.log('Account data:');
          console.log(res.data.accounts);
          ctrl.accounts = res.data.accounts;
        });
    };

    this.getTransactionsHandler = () => {
      $http.get('/transactions')
        .then((res) => {
          console.log('Transaction data:');
          console.log(res.data);
          ctrl.transactions = res.data.transactions;
        });
    };
  }).$inject = ['plaid'];
