angular.module('coinsaver')
  .component('banks', {
    bindings: {
    },
    controller: 'BankController',
    template: `
    <div>
      <div ng-if="$ctrl.loading" style="margin-top:50px; text-align:center;">
        <img src="../../images/Blocks.svg" />
        <h5 style="margin-top:-15px">Loading</h5>
      </div>
      <div ng-if="!$ctrl.loading">
        <md-button id="link-btn" class="md-raised md-primary" ng-if="!$ctrl.linked" ng-click="$ctrl.handleLink()">Link A Bank Account</md-button>
      </div>
      <transactions ng-if="$ctrl.linked" info="$ctrl.transactions[0]" delink="$ctrl.delink()"/>
    </div>
    `,
  })
  .controller('BankController', function bankControllerFunction($http, $mdDialog, User) {
    const ctrl = this;

    this.linked = false;
    this.accounts = [];
    this.transactions = [];
    this.loading = false;

    this.handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'CoinSaver',
      env: 'sandbox',
      product: ['transactions'],
      key: 'a2467d682553b671fe4f51d29561a3',
      onSuccess: function handlerOnSuccess(publicToken) {
        ctrl.loading = true;
        console.log('plaid client created: public token', publicToken);
        $http.post('/get_access_token', { publicToken })
          .then((res) => {
            console.log('Successful post to exchange tokens!', res);

            $http.get('/accounts')
              .then((res) => {
                console.log('User data:');
                console.log(res.data);
                ctrl.accounts = res.data.accounts;
                ctrl.handleChooseAccount();
              });
          });
      },
    });

    this.handleLink = () => {
      this.handler.open();
    };

    this.delink = () => {
      this.linked = false;
      this.accounts = [];
      this.transactions = [];
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
        fullscreen: ctrl.customFullscreen,
      })
        .then((answer) => {
          $http.get('/transactions')
            .then((res) => {
              console.log('Transactions: ', res.data);
              ctrl.transactions = res.data;
              ctrl.linked = true;
              ctrl.loading = false;
            });
        }, () => {
          ctrl.linked = false;
          ctrl.accounts = [];
          ctrl.transactions = [];
          ctrl.loading = false;
        });
    };

    function DialogController($scope, accounts) {
      $scope.accounts = accounts;
      $scope.currentId = '';

      $scope.answer = (answer) => {
        $mdDialog.hide(answer);
      };

      $scope.cancel = () => {
        $mdDialog.cancel();
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

    // *Comment out when testing to prevent excessive calls to Plaid
    // $http.get('/transactions')
    //   .then((res) => {
    //     console.log('Transaction data:');
    //     console.log(res.data);
    //     ctrl.accounts = res.data;
    //     ctrl.handleChooseAccount();
    //   });
  }).$inject = ['plaid'];
