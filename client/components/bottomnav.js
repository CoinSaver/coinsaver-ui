angular.module('coinsaver')
.component('botNav', {
  bindings: {
  },

  controller: function ($mdPanel) {
    this._mdPanel = $mdPanel;

    this.disableParentScroll = false;

    this.showDialog = function(page) {
      // may need some logic here to prevent crashing from clicking a million tabs
      // if (!this.panel) {
        this.createDialog(page);
      // }
      
      return this.panel.open();
    };


    this.createDialog = function(page) {

      var position = this._mdPanel.newPanelPosition()
          .absolute()
          .center();

      var config = {
        attachTo: angular.element(document.body),
        controller: PanelDialogCtrl,
        controllerAs: 'ctrl',
        disableParentScroll: this.disableParentScroll,
        template: `ok`,
        hasBackdrop: true,
        panelClass: 'demo-dialog-example',
        position: position,
        trapFocus: true,
        zIndex: 150,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true
      };

      if (page === 'faq'){
        config.template =
            `
            <div role="dialog" aria-label="Frequently Asked Questions" layout="column" layout-align="center center" style="background-color:rgba(77, 77, 77, 1)">
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>FAQ</h2>
                </div>
              </md-toolbar>
            
              <div class="demo-dialog-content">
                <p align="center">
                  <b><u>How does it work?</u></b><br>
                  After linking your Bank account and Coinbase account, Coinsaver calculates your accumulated spare change and invests it into Bitcoin/Ethereum.
                </p>
                <p align="center">
                  <b><u>Do I need a Coinbase Account?</u></b><br>
                  Yes. Coinsaver does not ever hold your coins. Rather, Coinsaver automatically makes purchases to your personal Coinbase account for you based on your preferences.     
                </p>
                <p align="center">
                  <b><u>Is it secure?</u></b><br>
                  Yes. After making a secure connection via your bank, and via Coinbase, you are essentially giving us permission to buy Bitcoin/Ethereum to your Coinbase account for you. Coinsaver does not save your credit card data, and does not have permission to send your coins (only buy).     
                </p>

              </div>
            
              <div layout="row" class="demo-dialog-button">
                <md-button md-autofocus class="md-primary" flex ng-click="ctrl.closeDialog()">
                  Close
                </md-button>
              </div>
            </div>
            `
      }

      if (page === 'legal'){
        config.template =
            `
            <div role="dialog" aria-label="Legal" layout="column" layout-align="center center"  style="background-color:rgba(77, 77, 77, 1)">
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>Legal</h2>
                </div>
              </md-toolbar>
            
              <div class="demo-dialog-content">
                <p align="center">
                  I'm an expert in bird law and this is 100% legal
                </p>
                <p align="center">
                  I'm an expert in bird law and this is 100% legal
                </p>
                <p align="center">
                  I'm an expert in bird law and this is 100% legal
                </p>
              </div>
            
              <div layout="row" class="demo-dialog-button">
                <md-button md-autofocus class="md-primary" flex ng-click="ctrl.closeDialog()">
                  Close
                </md-button>
              </div>
            </div>
            `
      }

      if (page === 'contact'){
        config.template =
            `
            <div role="dialog" aria-label="Eat me!" layout="column" layout-align="center center"  style="background-color:rgba(77, 77, 77, 1)">
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>Contact</h2>
                </div>
              </md-toolbar>
            
              <div class="demo-dialog-content">
                <p align="center">
                  For all inqueries and customer support, please contact us at: 
                  <b>coinsavermain@gmail.com</b>
                </p>
              </div>
            
              <div layout="row" class="demo-dialog-button">
                <md-button md-autofocus class="md-primary" flex ng-click="ctrl.closeDialog()">
                  Close
                </md-button>
              </div>
            </div>
            `
      }

      this.panel = this._mdPanel.create(config);
    };


    function PanelDialogCtrl(mdPanelRef) {
      this._mdPanelRef = mdPanelRef;
    }

    PanelDialogCtrl.prototype.closeDialog = function() {
      this._mdPanelRef && this._mdPanelRef.close().then(function() {
        angular.element(document.querySelector('.demo-dialog-open-button')).focus();
      });
    };

  },
  
  template: `
    <div>
      <section layout="row" layout-sm="column" layout-align="center center" layout-wrap style="max-height:22px;">
        <md-button class="md-primary md-hue-1" style="min-height:20px;max-height:20px;line-height:20px;" ng-click="$ctrl.showDialog('faq')">FAQ</md-button>
        <md-button class="md-primary md-hue-1" style="min-height:20px;max-height:20px;line-height:20px;text-transform:lowercase" ng-click="$ctrl.showDialog('legal')">Legal</md-button>
        <md-button class="md-primary md-hue-1" style="min-height:20px;max-height:20px;line-height:20px;text-transform:lowercase" ng-click="$ctrl.showDialog('contact')">Contact</md-button>
        <!-- <div class="label">Themed</div> -->
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <c style="margin-top:-2px; font-size:12px">CoinSaverApp &copy;2017, ARMS Corp.</c>
        <c> </c>
      </section>
    </div>
  `
});