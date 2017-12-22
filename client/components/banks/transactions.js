angular.module('coinsaver')
.component('transactions', {
  bindings: {
    info: '<',
    delink: '&',
  },
  controller($scope, $mdDialog, $state, $stateParams, CoinMover) {
    const ctrl = this;

    let originatorEv;
    this.clickedinvest = false;

    this.updateCoin = () => {
      CoinMover.set({working: 'true'});
    }

    $scope.openMenu = ($mdOpenMenu, ev) => {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.handleDelink = (ev) => {
      const confirm = $mdDialog.confirm()
        .title('Delink bank account?')
        .textContent('Disconnect your bank account?')
        .ariaLabel('Disconnect')
        .targetEvent(ev)
        .ok('CONFIRM')
        .cancel('cancel');

      $mdDialog.show(confirm)
        .then(() => {
          ctrl.delink();
        });

      orginatorEv = null;
    };
  },
  template: `
  <div layout="column" layout-align="center center">
    <md-toolbar style="width:600px;margin-top:50px;border-radius:3px!important">
      <div class="md-toolbar-tools">
        <h2 flex md-truncate>{{$ctrl.info.name}}</h2>

        <span style="font-size: 80%;">Uninvested change: {{$ctrl.info.roundSum | currency}}</span>

        <md-menu md-position-mode="target-right bottom">
          <md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)">
            <md-icon md-menu-origin>menu</md-icon>
          </md-button>
          <md-menu-content width="4" class="menucontent">
            <md-menu-item>
              <md-button>
                <md-icon md-menu-align-target>monetization_on</md-icon>
                <a id="pagechange"  ng-click="$ctrl.updateCoin()" ui-sref-active="account" md-nav-sref="account({myParam: 'home'})" name="account" ui-sref="account({myParam: 'home'})">
                  Cash-in your change
                </a>
              </md-button>
            </md-menu-item>
            <md-menu-item>
            <md-button>
              <md-icon md-menu-align-target>settings</md-icon>
              <a id="pagechange" ui-sref="settings">
                Account settings
              </a>
            </md-button>
          </md-menu-item>
            <md-menu-divider />
            <md-menu-item>
              <md-button ng-click="handleDelink($event)">
                <md-icon>cancel</md-icon>
                Unlink your bank
              </md-button>
            </md-menu-item>
          </md-menu-content>
        </md-menu>

      </div>
    </md-toolbar>

    <md-content>
      <md-list>
        <md-list-item class="md-2-line transactionitem" layout="row" ng-repeat="transaction in $ctrl.info.transactions" style="width:600px;overflow-x: hidden;">

          <div class="md-list-item-text">
            <p>{{transaction.date}}</p>
            <p>{{transaction.name}}</p>
          </div>

          <div class="md-secondary">{{transaction.round | currency}}</div>

          <md-divider class="transactiondivider"></md-divider>
          
        </md-list-item>
      </md-list>
    </md-content>
  </div>
`,
})
.controller('MenuController', ($scope, $mdDialog) => {
  let originatorEv;

  $scope.openMenu = ($mdOpenMenu, ev) => {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.handleDelink = (ev) => {
    const confirm = $mdDialog.confirm()
      .title('Delink bank account?')
      .textContent('Disconnect your bank account?')
      .ariaLabel('Disconnect')
      .targetEvent(ev)
      .ok('CONFIRM')
      .cancel('cancel');

    $mdDialog.show(confirm)
      .then(() => {
        ctrl.delink();
      });

    orginatorEv = null;
  };
});
