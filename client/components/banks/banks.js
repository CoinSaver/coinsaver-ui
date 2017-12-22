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

    <div ng-if="!$ctrl.linked && !$ctrl.loading" class="center linkcard">
      <div>
        <img id="bankicon" src='../../bank-icon.png' width="250" height="250">
      </div>
      <div>
        <md-button id="link-btn" class="md-raised md-primary" ng-click="$ctrl.handleLink()">Link A Bank Account</md-button>
      </div>
    </div>

    <transactions class="transactions" ng-if="$ctrl.linked" info="$ctrl.transactions[0]" delink="$ctrl.delink()"/>
  </div>
  `,
})
.controller('BankController', function bankControllerFunction($scope, $http, $mdDialog, User, Auth) {
  const ctrl = this;

  this.linked = false;
  this.accounts = [];
  this.transactions = [];
  this.loading = true;

  this.$onInit = () => {
    Auth.$onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const ref = firebase.database().ref(`users/${firebaseUser.uid}/userinfo`);
        ref.on('value', (snapshot) => {
          const info = snapshot.val();
          ctrl.linked = info.linked_plaid;

          if (ctrl.linked) {
            ctrl.transactions = info.transactions;
          }

          ctrl.loading = false;
          $scope.$apply();
        });
      }
    });
  };

  this.handler = Plaid.create({
    apiVersion: 'v2',
    clientName: 'CoinSaver',
    env: 'sandbox',
    product: ['transactions'],
    key: 'a2467d682553b671fe4f51d29561a3',
    onSuccess: function handlerOnSuccess(publicToken) {
      ctrl.loading = true;

      const uid = Auth.$getAuth().uid;

      $http.post('/get_access_token', { publicToken, uid })
        .then((res) => {
          // console.log('Successful post to exchange tokens!', res);

          $http.get('/accounts')
            .then((res) => {
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
    this.loading = true;
    $http.post('/unlinkPlaid', { uid: Auth.$getAuth().uid })
      .then(() => {
        ctrl.linked = false;
        ctrl.accounts = [];
        ctrl.transactions = [];
        ctrl.loading = false;
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
      fullscreen: ctrl.customFullscreen,
    })
      .then((answer) => {
        $http.post('/accounts', {
          uid: Auth.$getAuth().uid,
          i: ctrl.accounts[answer].accountId,
        })
          .then((res) => {
            $http.post('/transactions', { uid: Auth.$getAuth().uid })
              .then((transRes) => {
                // console.log('Transactions: ', transRes.data);
                ctrl.transactions = transRes.data;
                ctrl.linked = true;
                ctrl.loading = false;
              });
          });
      }, () => {
        $http.post('/unlinkPlaid', { uid: Auth.$getAuth().uid })
          .then(() => {
            ctrl.linked = false;
            ctrl.accounts = [];
            ctrl.transactions = [];
            ctrl.loading = false;
          });
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
