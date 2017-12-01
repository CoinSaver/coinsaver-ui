angular.module('coinsaver', ['ngMaterial'])
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    // .dark();
})
.component('myApp', {
  controller: function($http) {
    const ctrl = this;

    let loggedIn = false;
    let view = 'home';

    // this.$onInit = () => {
    //   console.log('main controller', ctrl);
    // }
  },

  template: 
    `
    <md-content layout="column" flex>
      <md-nav-bar md-selected-nav-item="$ctrl.currentNavItem" nav-bar-aria-label="navigation links">
        <md-nav-item md-nav-click="$ctrl.view='home'" name="home">
          Home
        </md-nav-item>
        <md-nav-item md-nav-click="$ctrl.view='stats'" name="stats">
          Stats
        </md-nav-item>
        <md-nav-item md-nav-click="$ctrl.view='banks'" name="banks">
          Banks
        </md-nav-item>
        <md-nav-item md-nav-click="$ctrl.view='account'" name="account">
          Account
        </md-nav-item>
      </md-nav-bar>
    </md-content>
    <md-content>

    <div ng-if="$ctrl.view === 'home'">
      <md-content layout="column" flex>
        Home goes here
        <!-- <home /> -->
      </md-content>
    </div>
    <div ng-if="$ctrl.view === 'stats'">
      <md-content layout="column" flex>
        Stats go here
        <!-- <home /> -->
      </md-content>
    </div>
    <div ng-if="$ctrl.view === 'banks'">
      <md-content layout="column" flex>
        Banks go here
        <!-- <home /> -->
      </md-content>
    </div>
    <div ng-if="$ctrl.view === 'account'">
      <md-content layout="column" flex>
        Account goes here
        <!-- <home /> -->
      </md-content>
    </div>

    <md-content>
  `
})


// LOGIN CONTENT

// <div ng-if="$ctrl.loggedIn === false">
// <md-content layout="column" flex>
//     <md-button class="md-primary md-raised" ng-click="">
//       Login
//     </md-button>
// </md-content>
// </div>