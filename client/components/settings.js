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
                  <h4>Auto-purchase amount:</h4>

                  <div class="autopurchase">

                    <div layout="row">
                      <md-input-container class="amountinput">
                        <label>Minimum purchase</label>
                        <input ng-model="minPurchase" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit">
                      </md-input-container>

                      <md-input-container class="amountinput">
                        <label>Add'l Purchase</label>
                        <input ng-model="autoPurchase" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit">
                          <md-tooltip class="tooltipcolor" md-direction="top" style="margin-top:-20px;">
                            (Optional) Set a flat, additional purchase amount
                          </md-tooltip>
                        </input>
                      </md-input-container>

                      <div>
                        <md-input-container class="amountinput">
                          <label>Total minimum</label>
                          <input name="total" ng-model="totalMin" ng-min="5" min="5" ng-readonly="true" type="tel">
                        </md-input-container>
                        <p ng-show="totalMin < 5" style="color:red; margin-top:-40px; font-size:10px; margin-left:3px;">Total minimum must be at least $5</p>
                      </div>
                    </div>

                    <div class="enablecheck">
                      <input type="checkbox" ng-model="enableMaxPurchase" ng-disabled="!enableEdit">
                        Set maximum purchase limit?
                      </input>

                      <div layout="row">
                        <md-input-container class="amountinput" ng-style="{'visibility': enableMaxPurchase?'visible':'hidden'}">
                          <label>Maximum purchase</label>
                          <input ng-model="maxPurchase" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit">
                          <p ng-show="maxPurchase < totalMin" style="color:red; font-size:10px; margin-left:3px;">Maximum must be greater than total minimum</p>
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
    $scope.frequency = 'weekly';
    $scope.autoPurchase = 0.00;
    $scope.minPurchase = 0.00;
    $scope.totalMin = $scope.autoPurchase + $scope.minPurchase;
    $scope.maxPurchase = 0.00;
    $scope.noMaxPurchase = true;

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
      $scope.autoPurchase = parseFloat(parseFloat($scope.autoPurchase).toFixed(2)) || 0;
      $scope.minPurchase = parseFloat(parseFloat($scope.minPurchase).toFixed(2)) || 0;
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
