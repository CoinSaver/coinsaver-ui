angular.module('coinsaver')
  .component('banks', {
    bindings: {
    },
    controller: 'BankController',
    template: `
    <div>
      <md-button id="link-btn" class="md-raised md-primary" ng-if="$ctrl.linked===false" ng-click="$ctrl.checkClick()">Link A Bank Account</md-button>
      <transactions ng-repeat="item in $ctrl.transactions" info="item"/>
    </div>
    `,
  })
  .controller('BankController', function bankControllerFunction($http, $mdDialog, User) {
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
            console.log('Successful post to exchange tokens!', res);

            $http.get('/transactions')
              .then((res) => {
                console.log('User data:');
                console.log(res.data);
                ctrl.accounts = res.data;
                ctrl.handleChooseAccount();
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
          ctrl.transactions = res.data;
        });
    };

    this.status = '  ';
    this.handleChooseAccount = (ev) => {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/components/banks/banks.html',
        parent: angular.element(document.body),
        targetEvent: null,
        clickOutsideToClose: false,
        escapeToClose: false,
        locals: {
          accounts: ctrl.accounts,
        },
        fullscreen: ctrl.customFullscreen, // Only for -xs, -sm breakpoints.
      })
        .then((answer) => {
          ctrl.transactions.push(ctrl.accounts[parseInt(answer)]);
          ctrl.linked = true;
        }, () => {
          ctrl.linked = false;
          ctrl.accounts = [];
          ctrl.transactions = [];
        });
    };


    function DialogController($scope, accounts) {
      $scope.accounts = accounts;

      $scope.currentId = '';

      $scope.hide = () => {
        $mdDialog.hide();
      };

      $scope.cancel = () => {
        $mdDialog.cancel();
      };

      $scope.answer = (answer) => {
        $mdDialog.hide(answer);
      };

      $scope.selectedIndex;

      $scope.setSelection = (index, name) => {
        $scope.selectedIndex = index;
        $scope.selectedItem = name;
      };

      $scope.selectedItem = 'Select an account';

      $scope.getSelectedText = () => {
        return $scope.selectedItem;
      };
    }

    // *Leave commented out for testing purposes. Links account
    $http.get('/transactions')
      .then((res) => {
        console.log('Transaction data:');
        console.log(res.data);
        ctrl.accounts = res.data;
        ctrl.handleChooseAccount();
      });
  }).$inject = ['plaid'];
