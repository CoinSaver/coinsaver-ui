angular.module('coinsaver')
  .component('banks', {
    bindings: {
    },
    controller: 'BankController',
    template: `
    <div>
      <md-button id="link-btn" class="md-raised md-primary" ng-click="$ctrl.checkClick()">Link A Bank Account</md-button>
    </div>
  `,
  })
  .controller('BankController', function bankControllerFunction($http) {
    const ctrl = this;

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
            console.log('Successful post to exchange tokens!', res);
          });
      },
    });

    this.checkClick = () => {
      this.handler.open();
    };
  }).$inject = ['plaid'];
