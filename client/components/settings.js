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
      <div ng-controller="SettingsController" layout="column" ng-cloak style="max-width:600px;">
      
        <md-content layout-padding>
          <form name="settingsForm">
      
            <md-input-container class="md-block">
              <md-switch class="md-primary" name="special" ng-model="enableAutoPurchase" ng-disabled="true">
                Enable auto-purchase
                <md-tooltip class="tooltipcolor" md-direction="bottom">
                  Please unlink your account from the banks tab
                </md-tooltip>
              </md-switch>
            </md-input-container>

            <md-card>

              <md-card-actions layout="row" layout-align="end center">
                <md-button ng-if="!enableEdit" ng-click="activateEdit()">Edit</md-button>
                <md-button ng-if="enableEdit" ng-click="deactivateEdit()">Cancel</md-button>
                <md-button ng-if="enableEdit">Save</md-button>
              </md-card-actions>

              <md-card-content>

                <h4 style="margin-bottom:0px; padding-bottom:0px;">BTC:ETH purchase ratio</h4>

                <div layout="row">
                  <md-input-container flex="50">
                    <md-slider-container>

                      <md-icon class="mdicon" ng-click="decBTC()">keyboard_arrow_left</md-icon>

                      <div layout="column" style="margin-right:15px; text-align:center;">
                        <p style="margin-bottom:0px; padding-top:0px;"><b>BTC</b></p>
                        <p style="margin-top:0px;">{{bitcoin}}</p>
                      </div>

                      <md-slider-container ng-disabled="!enableEdit">
                        <md-slider min="0" max="100" ng-model="bitcoin" aria-label="ratioslider" ng-change="sliderControl()">
                        </md-slider>
                      </md-slider-container>

                      <div layout="column" style="margin-left:15px; text-align:center;">
                        <p style="margin-bottom:0px; padding-top:0px;"><b>ETH</b></p>
                        <p style="margin-top:0px;">{{ethereum}}</p>
                      </div>

                      <md-icon class="mdicon" ng-click="decETH()">keyboard_arrow_right</md-icon>
                      
                    </md-slider-container>
                  </md-input-container>
                </div>

                <div layout="row">
                  <h4 style="margin-right:20px;">Auto-purchase frequency:</h4>

                  <md-input-container>
                    <md-select style="margin-top:-5px;" ng-model="frequency" aria-label="frequencyselect" ng-disabled="!enableEdit">
                      <md-option ng-value="weekly" selected>weekly</md-option>
                    </md-select>
                  </md-input-container>
                </div>

                <div layout="column">

                <h4>Additional auto-purchase amounts:</h4>

                  <div class="autopurchase">

                    <div class="enableAdditional">

                      <div>
                        <input type="checkbox" ng-model="enableAdditionalPurchase" ng-disabled="!enableEdit">
                          Enable additional auto-purchase amount
                          <md-tooltip class="tooltipcolor" md-direction="bottom">This is a flat amount separate from accumulated change</md-tooltip>                        
                        </input>
                      </div>


                      <div layout="row">
                        <md-input-container class="amountinput">
                          <label>Additional purchase</label>
                          <input ng-model="additionalPurchase" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit || !enableAdditionalPurchase">
                          <p ng-show="additionalPurchase < 0" style="color:red; font-size:10px; margin-left:3px;">Cannot be a negative number</p>
                        </md-input-container>
                      </div>
                    </div>

                    <div class="enableMax">
                      <input type="checkbox" ng-model="enableMaxPurchase" ng-disabled="!enableEdit">
                        Enable maximum purchase limit
                      </input>

                      <div layout="row">
                        <md-input-container class="amountinput">
                          <label>Maximum purchase</label>
                          <input ng-model="maxPurchase" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit || !enableAdditionalPurchase">
                          <p ng-show="maxPurchase < trueMin" style="color:red; font-size:10px; margin-left:3px;">Maximum must be greater than {{trueMin | currency}}</p>
                        </md-input-container>
                      </div>
                    </div>
                    
                  </div>







                </div>

              </md-card-content>
            </md-card>

          </form>
        </md-content>
      
      </div>
    `,
  })
  .controller('SettingsController', ($scope) => {
    $scope.project = {
      description: 'Nuclear Missile Defense System',
      rate: 500,
      special: true,
    };

    $scope.enableAutoPurchase = true;
    $scope.enableEdit = false;
    $scope.bitcoin = 50;
    $scope.ethereum = 100 - $scope.bitcoin;
    $scope.frequency = 'monthly';
    $scope.minPurchase = 0.00;
    $scope.trueMin = Math.max(5, $scope.additionalPurchase);
    $scope.maxPurchase = 0.00;
    $scope.additionalPurchase = 0;
    $scope.enableMaxPurchase = false;
    $scope.enableAdditionalPurchase = false;

    $scope.decBTC = () => {
      if ($scope.bitcoin !== 0 && $scope.enableEdit) {
        $scope.bitcoin--;
        $scope.ethereum++;
      }
    };

    $scope.decETH = () => {
      if ($scope.ethereum !== 0 && $scope.enableEdit) {
        $scope.ethereum--;
        $scope.bitcoin++;
      }
    };

    $scope.sliderControl = () => {
      $scope.ethereum = 100 - $scope.bitcoin;
    };

    $scope.formatCurrency = () => {
      $scope.additionalPurchase = parseFloat(parseFloat($scope.additionalPurchase).toFixed(2)) || 0;
      $scope.maxPurchase = parseFloat(parseFloat($scope.maxPurchase).toFixed(2)) || null;
      $scope.totalMin = $scope.autoPurchase + $scope.minPurchase;
    };

    $scope.activateEdit = () => {
      $scope.enableEdit = true;
    };

    $scope.deactivateEdit = () => {
      $scope.enableEdit = false;
    };

  });
