angular.module('coinsaver')
.component('account', {
  bindings: {
  },
  controller() {
    this.getCoinapi = function() {
      console.log('ding')
    };
    
  },
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
