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
            <div role="dialog" aria-label="Frequently Asked Questions" layout="column" layout-align="center center">
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>FAQ</h2>
                </div>
              </md-toolbar>
            
              <div class="demo-dialog-content">
                <p>
                  Frequently asked questions etc
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
            <div role="dialog" aria-label="Legal" layout="column" layout-align="center center">
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>Legal</h2>
                </div>
              </md-toolbar>
            
              <div class="demo-dialog-content">
                <p>
                  I'm an expert in bird law and this is 100% legal
                </p>
                <p>
                  I'm an expert in bird law and this is 100% legal
                </p>
                <p>
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
            <div role="dialog" aria-label="Eat me!" layout="column" layout-align="center center">
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>Contact</h2>
                </div>
              </md-toolbar>
            
              <div class="demo-dialog-content">
                <p>
                  Contact us at . . .
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
      <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
        <md-button class="md-primary md-hue-1" ng-click="$ctrl.showDialog('faq')">FAQ</md-button>
        <md-button class="md-primary md-hue-1" ng-click="$ctrl.showDialog('legal')">Legal</md-button>
        <md-button class="md-primary md-hue-1" ng-click="$ctrl.showDialog('contact')">Contact</md-button>
        <!-- <div class="label">Themed</div> -->

      </section>
    </div>
  `
});