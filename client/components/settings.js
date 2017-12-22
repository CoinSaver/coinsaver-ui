angular.module('coinsaver')
  .component('settings', {
    controller(Auth) {
      const ctrl = this;

      this.autopurchase = true;

      this.toggleAutoPurchase = () => {
        ctrl.autopurchase = !ctrl.autopurchase;
      };
    },
    template: `
      <div layout="column" layout-align="center center">
        <h2 style="margin-top:40px;">Account settings</h2>

        <div ng-if="loading" style="margin-top:50px; text-align:center;">
          <img src="../images/Blocks.svg" />
          <h5 style="margin-top:-15px">Loading</h5>
        </div>

        <div ng-if="!loading" ng-controller="SettingsController" layout="column" ng-cloak style="min-width:600px;">
        
          <md-content layout-padding>
            <form name="settingsForm">
        
              <md-input-container class="md-block">
                <md-switch class="md-primary autopurchaseswitch" name="special" ng-model="toSave.enableAutoPurchase" ng-disabled="true">
                  Enable auto-purchase
                  <md-tooltip class="tooltipcolor" md-direction="bottom">
                    Please unlink your account from the banks tab
                  </md-tooltip>
                </md-switch>
              </md-input-container>

              <md-card class="settingscard">

                <md-card-actions class="cardactions" layout="row" layout-align="end center">
                  <md-button ng-if="!enableEdit" ng-click="activateEdit()">Edit</md-button>
                  <md-button ng-if="enableEdit" ng-click="cancelForm()">Cancel</md-button>
                  <md-button ng-if="enableEdit" ng-click="submitForm()">Save</md-button>
                </md-card-actions>
                <md-divider class="{{enableEdit ? 'noproblem' : 'noeditdivider'}}"/>
                <md-card-content>
                  <md-tooltip ng-if="!enableEdit" class="tooltiperror" md-direction="top">Click edit to continue</md-tooltip>

                  <div ng-repeat="errors in submitErrors">
                    <ul style="color:red; font-size:13px;margin:0px;padding:0px;">{{errors}}</ul>
                  </div>

                  <h4 style="margin-bottom:0px; padding-bottom:0px;">BTC:ETH purchase ratio</h4>

                  <div layout="row">
                    <md-input-container flex="50">
                      <md-slider-container>

                        <md-icon class="mdicon" ng-click="decBTC()">keyboard_arrow_left</md-icon>

                        <div layout="column" style="margin-right:15px; text-align:center;">
                          <p style="margin-bottom:0px; padding-top:0px;"><b>BTC</b></p>
                          <p style="margin-top:0px;">{{toSave.btc_percent}}</p>
                        </div>

                        <md-slider-container ng-disabled="!enableEdit">
                          <md-slider min="0" max="100" ng-model="toSave.btc_percent" aria-label="ratioslider" ng-change="sliderControl()">
                          </md-slider>
                        </md-slider-container>

                        <div layout="column" style="margin-left:15px; text-align:center;">
                          <p style="margin-bottom:0px; padding-top:0px;"><b>ETH</b></p>
                          <p style="margin-top:0px;">{{eth_percent}}</p>
                        </div>

                        <md-icon class="mdicon" ng-click="decETH()">keyboard_arrow_right</md-icon>
                        
                      </md-slider-container>
                    </md-input-container>
                  </div>

                  <div layout="row">
                    <h4 style="margin-right:20px;">Auto-purchase frequency:</h4>

                    <md-input-container>
                      <md-select style="margin-top:-5px;" ng-model="frequency" aria-label="frequencyselect" ng-disabled="!enableEdit">
                        <md-option ng-value="monthly" selected>monthly</md-option>
                      </md-select>
                    </md-input-container>
                  </div>

                  <div layout="column">

                    <h4>Additional auto-purchase amounts:</h4>

                    <div class="autopurchase">

                      <div class="enableAdditional">

                        <div>
                          <input type="checkbox" ng-model="toSave.enforce_additional" ng-disabled="!enableEdit">
                            Enable additional auto-purchase amount
                            <md-tooltip ng-if="enableEdit" class="tooltipcolor" md-direction="bottom">This is a flat amount separate from accumulated change</md-tooltip>                        
                          </input>
                        </div>

                        <div layout="row">
                          <md-input-container class="amountinput">
                            <label>Additional purchase</label>
                            <input ng-model="toSave.purchase_additional" ng-change="updateTrueMin()" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit || !toSave.enforce_additional">
                            <p ng-show="toSave.enforce_additional && toSave.purchase_additional <= 0" style="color:red; font-size:10px; margin-left:3px;">Must be a positive number</p>
                          </md-input-container>
                        </div>
                      </div>

                      <div class="enableMax">
                        <input type="checkbox" ng-model="toSave.enforce_max" ng-disabled="!enableEdit">
                          Enable maximum purchase limit
                        </input>

                        <div layout="row">
                          <md-input-container class="amountinput">
                            <label>Maximum purchase</label>
                            <input ng-model="toSave.purchase_max" type="tel" ng-blur="formatCurrency()" ng-readonly="!enableEdit || !toSave.enforce_max">
                            <p ng-show="toSave.enforce_max && toSave.purchase_max < trueMin" style="color:red; font-size:10px; margin-left:3px;">Maximum must be greater than {{trueMin | currency}}</p>
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
      </div>
    `,
  })
  .controller('SettingsController', ($scope, Auth) => {

    $scope.loading = true;
    $scope.saved = {};
    $scope.toSave = {}
    $scope.enableEdit = false;
    $scope.submitErrors = [];

    const temp = Auth.$getAuth().uid;
    const ref = firebase.database().ref(`users/${temp}/usersettings`);

    ref.on('value', (snapshot) => {
      $scope.saved = snapshot.val();
      $scope.saved.enableAutoPurchase = true;

      $scope.toSave = JSON.parse(JSON.stringify($scope.saved));

      $scope.frequency = 'monthly';
      $scope.eth_percent = 100 - $scope.toSave.btc_percent;
      $scope.trueMin = Math.max(5, $scope.toSave.purchase_additional) || 5;

      $scope.loading = false;
    }, (errorObject) => {
      console.log(errorObject);
    });

    $scope.decBTC = () => {
      if ($scope.toSave.btc_percent !== 0 && $scope.enableEdit) {
        $scope.toSave.btc_percent--;
        $scope.eth_percent = 100 - $scope.toSave.btc_percent;
      }
    };

    $scope.decETH = () => {
      if ($scope.eth_percent !== 0 && $scope.enableEdit) {
        $scope.toSave.btc_percent++;
        $scope.eth_percent = 100 - $scope.toSave.btc_percent;
      }
    };

    $scope.sliderControl = () => {
      $scope.eth_percent = 100 - $scope.toSave.btc_percent;
    };

    $scope.updateTrueMin = () => {
      $scope.trueMin = Math.max(5, $scope.toSave.purchase_additional) || 5;
    };

    $scope.formatCurrency = () => {
      $scope.toSave.purchase_additional = parseFloat(parseFloat($scope.toSave.purchase_additional).toFixed(2)) || 0;
      $scope.toSave.purchase_max = parseFloat(parseFloat($scope.toSave.purchase_max).toFixed(2)) || 0;
      $scope.totalMin = $scope.toSave.autoPurchase + $scope.toSave.purchase_min;
    };

    $scope.activateEdit = () => {
      $scope.enableEdit = true;
    };

    $scope.cancelForm = () => {
      $scope.enableEdit = false;
      $scope.toSave = JSON.parse(JSON.stringify($scope.saved));
      $scope.frequency = 'monthly';
      $scope.eth_percent = 100 - $scope.toSave.btc_percent;
      $scope.trueMin = Math.max(5, $scope.toSave.purchase_additional) || 5;
      $scope.submitErrors = [];
    };


    $scope.submitForm = () => {
      $scope.submitErrors = [];

      if ($scope.toSave.enforce_additional && $scope.toSave.purchase_additional <= 0) {
        $scope.submitErrors.push('Please disable additional auto-purchase or enter a positive value');
      }

      if ($scope.toSave.enforce_max && $scope.toSave.enforce_max < $scope.trueMin) {
        $scope.submitErrors.push(`Please disable max purchase limit or enter value greater than ${$scope.trueMin}`);
      }

      if ($scope.submitErrors.length === 0) {
        $scope.loading = true;
        ref.update($scope.toSave, () => {
          ref.on('value', (snapshot) => {
            $scope.saved = snapshot.val();
            $scope.toSave = JSON.parse(JSON.stringify($scope.saved));
            $scope.enableEdit = false;
            $scope.loading = false;
          });
        });
      }
    };
  });
