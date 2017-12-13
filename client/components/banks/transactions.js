angular.module('coinsaver')
  .component('transactions', {
    bindings: {
      info: '<',
    },
    controller: function () {
      const ctrl = this;

      this.toggle = {};
    },
    template: `
    <md-toolbar class="md-hue-2">
    <div class="md-toolbar-tools">
      <h2 flex md-truncate>{{$ctrl.info.name}}</h2>

      <span style="font-size: 80%;">Uninvested change: {{$ctrl.info.roundSum | currency}}</span>

      <md-button class="md-icon-button" aria-label="More">
        <md-icon>highlight_off</md-icon>
      </md-button>
    </div>
  </md-toolbar>

  <md-content>
    <md-list>
      <md-list-item class="md-2-line" layout="row" ng-repeat="transaction in $ctrl.info.transactions">

        <div class="md-list-item-text">
          <p>{{transaction.date}}</p>
          <p>{{transaction.name}}</p>
        </div>

        <div class="md-secondary">{{transaction.round | currency}}</div>

        <md-divider />
        
      </md-list-item>
    </md-list>
  </md-content>
  `,
  });
