angular.module('coinsaver')
  .component('settings', {
    controller() {
      const ctrl = this;

      this.autopurchase = true;

      this.toggleAutoPurchase = () => {
        ctrl.autopurchase = !ctrl.autopurchase;
      };
    },
    template: `
      <h3>Account settings</h3>
      <div ng-controller="AppCtrl" layout="column" ng-cloak style="max-width:50%;">
      
        <md-content layout-padding>
          <form name="settingsForm">
      
            <md-input-container class="md-block">
              <md-switch class="md-primary" name="special" ng-model="autoPurchase" required>
                Enable auto-purchase
              </md-switch>
            </md-input-container>
      
            <h4 style="margin-bottom:0px; padding-bottom:0px;">BTC:ETH purchase ratio</h4>

            <div layout="row">
              <md-input-container flex="50">
                <md-slider-container>

                  <md-icon class="mdicon" ng-disabled="bitcoin===0" ng-click="decBTC()">keyboard_arrow_left</md-icon>

                  <div layout="column" style="margin-right:15px; text-align:center;">
                    <p style="margin-bottom:0px; padding-top:0px;"><b>BTC</b></p>
                    <p style="margin-top:0px;">{{bitcoin}}</p>
                  </div>

                  <md-slider min="0" max="100" ng-model="bitcoin" aria-label="ratioslider" ng-change="sliderControl()">
                  </md-slider>

                  <div layout="column" style="margin-left:15px; text-align:center;">
                    <p style="margin-bottom:0px; padding-top:0px;"><b>ETH</b></p>
                    <p style="margin-top:0px;">{{ethereum}}</p>
                  </div>

                  <md-icon class="mdicon" ng-disabled="ethereum===100" ng-click="decETH()">keyboard_arrow_right</md-icon>
                  
                </md-slider-container>
              </md-input-container>
      
            </div>
      
            <md-input-container class="md-block">
              <label>Client Email</label>
              <input required type="email" name="clientEmail" ng-model="project.clientEmail"
                     minlength="10" maxlength="100" ng-pattern="/^.+@.+\..+$/" />
      
              <div ng-messages="settingsForm.clientEmail.$error" role="alert">
                <div ng-message-exp="['required', 'minlength', 'maxlength', 'pattern']">
                  Your email must be between 10 and 100 characters long and look like an e-mail address.
                </div>
              </div>
            </md-input-container>
      
            <md-input-container class="md-block">
              <label>Hourly Rate (USD)</label>
              <input required type="number" step="any" name="rate" ng-model="project.rate" min="800"
                     max="4999" ng-pattern="/^1234$/" />
      
              <div ng-messages="settingsForm.rate.$error" multiple md-auto-hide="false">
                <div ng-message="required">
                  You've got to charge something! You can't just <b>give away</b> a Missile Defense
                  System.
                </div>
      
                <div ng-message="min">
                  You should charge at least $800 an hour. This job is a big deal... if you mess up,
                  everyone dies!
                </div>
      
                <div ng-message="pattern">
                  You should charge exactly $1,234.
                </div>
      
                <div ng-message="max">
                  {{settingsForm.rate.$viewValue | currency:"$":0}} an hour? That's a little ridiculous. I
                  doubt even Bill Clinton could afford that.
                </div>
              </div>
            </md-input-container>
      
            <md-input-container class="md-block">
              <md-checkbox name="tos" ng-model="project.tos" required>
                I accept the terms of service.
              </md-checkbox>
              <div ng-messages="settingsForm.tos.$error" multiple md-auto-hide="false">
                <div ng-message="required">
                  You must accept the terms of service before you can proceed.
                </div>
              </div>
            </md-input-container>
      
            <md-input-container class="md-block">
              <md-switch class="md-primary" name="special" ng-model="project.special" required>
                Enable special options.
              </md-switch>
              <div ng-messages="settingsForm.special.$error" multiple>
                <div ng-message="required">
                  You must enable all special options before you can proceed.
                </div>
              </div>
            </md-input-container>
            <div>
              <md-button type="submit">Submit</md-button>
            </div>
      
            <p style="font-size:.8em; width: 100%; text-align: center;">
              Make sure to include <a href="https://docs.angularjs.org/api/ngMessages" target="_blank">ngMessages</a> module when using ng-message markup.
            </p>
          </form>
        </md-content>
      
      </div>
    `,
  })
  .controller('AppCtrl', function($scope) {
    $scope.project = {
      description: 'Nuclear Missile Defense System',
      rate: 500,
      special: true
    };

    $scope.autoPurchase = true;
    $scope.bitcoin = 50;
    $scope.ethereum = 100-$scope.bitcoin;

    $scope.decBTC = () => {
      $scope.bitcoin--;
      $scope.ethereum++;
    }

    $scope.decETH = () => {
      $scope.ethereum--;
      $scope.bitcoin++;
    }

    $scope.sliderControl = () => {
      $scope.ethereum = 100 - $scope.bitcoin;
    };

  });
