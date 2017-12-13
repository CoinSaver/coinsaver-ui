angular.module('coinsaver', ['ngMaterial', 'firebase', 'ngCookies', 'ui.router'])
  .config(($mdThemingProvider) => {
    $mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('light-green', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('green', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
  })
  .config(function($stateProvider) {
    var homeState = {
      name: 'home',
      url: '/',
      template: '<home />'
    }
    var statsState = {
      name: 'stats',
      url: '/stats',
      template: '<stats />'
    }
    var banksState = {
      name: 'banks',
      url: '/banks',
      template: '<banks />'
    }
    var accountState = {
      name: 'account',
      url: '/account',
      template: '<account />'
    }
    var coinState = {
      name: 'coin',
      url: '/?code',
      template: '<account />'
    }
    $stateProvider.state(homeState);
    $stateProvider.state(statsState);
    $stateProvider.state(banksState);
    $stateProvider.state(accountState);
  })

  .component('myApp', {
    controller($mdDialog, $http, $cookies) {

      const ctrl = this;

      this.loggedIn = false;
      this.user = {};

      this.view = 'home';

      this.testFunc = function(){
        console.log('The test func has been clicked,')
        console.log('The current user data is; ')
        console.log(ctrl.user)
      }

      this.logOut = function(){
        this.loggedIn = false;
        this.user = {};
        $cookies.remove('coinsaveruser')
      }

      // ------------------
      // BEGIN FIREBASE
      // ------------------

      this.openLoginDialog = (event, loginType) => {
        var loginWindow = function($mdDialog, $http, Auth, $cookies) {
          const logwin = this;

          this.loginType = loginType;
          this.email = '';
          this.displayName = '';
          this.passwordError = '';
          this.firebaseId = '';
          this.user = {};
          this.showProgress = false;

          logwin.handleSocialLogin = (website) => {
            logwin.showProgress = true;
            Auth.$signInWithPopup(website)
              .then(function(result) {
                console.log('Signed into ' + website + '  as: ' + result.user);
                logwin.user.firebaseId = result.user.uid;
                logwin.user.accountInfo = result.user;
                logwin.user.displayName = result.user.displayName;
                $http({
                  method: 'POST',
                  url: '/#/account',
                  data: logwin.user
                }).then(function(userData) {
                  logwin.answer(userData.data);
                  logwin.showProgress = false;
                }, function(err) {
                  console.log(website + ' auth on localhost failed', err);
                });
                logwin.answer(logwin.user);
              }).catch(function(error) {
                console.error('Authentication failed:', error);
              });
          };

          logwin.handleGoogleLogin = () => {
            logwin.showProgress = true;            
            logwin.handleSocialLogin('google');            
          };

          logwin.createUser = (callback) => {
            Auth.$createUserWithEmailAndPassword(logwin.email, logwin.password)
              .then(function(firebaseUser) {
                // console.log('user created ', firebaseUser);
                callback(true);
              }).catch(function(error) {
                // console.log('error creating', error);
                callback(false);
              });
          };

          logwin.loginUser = (callback) => {
            Auth.$signInWithEmailAndPassword(logwin.email, logwin.password)
              .then(function(firebaseUser) {
                logwin.user.firebaseId = firebaseUser.uid;
                logwin.user.accountInfo = firebaseUser;
                logwin.user.displayName = logwin.displayName;
                // console.log('user logged in ', logwin.user.displayName);
                callback(logwin.user);
              }).catch(function(error) {
                callback(false);
                console.log('login error ', error);
              });
          };

          logwin.handleLoginButton = (displayName, password) => {
            if (logwin.loginType === 'signup') {
              logwin.createUser(function(isCreated) {
                if (isCreated) {
                  logwin.password = '';
                  logwin.loginType = 'login';
                } else {
                  console.log('user creation failed, look around')
                }
              });
            } else {
              logwin.loginUser(function(signedInUser) {
                if (signedInUser) {
                  logwin.showProgress = true;
                  $http({
                    method: 'POST',
                    url: '/login',
                    data: signedInUser
                  }).then(function(userData) {
                    logwin.answer(userData.data);
                    logwin.showProgress = false;                    
                  }, function(err) {
                    console.log('auth error: ', err);
                  });
                } else {
                  console.log('something went wrong in authentication')
                }
              });
            }
          };

          logwin.hide = function () {
            $mdDialog.hide();
          };

          logwin.cancel = function () {
            $mdDialog.cancel();
          };

          logwin.answer = function (userData) {
            console.log('Succesfully signed in: ', userData);
            var user = {
              displayName: userData.displayName,
              firebaseId: userData.firebaseId,
            };
            $cookies.putObject('mycoinsaveruser', user);
            $mdDialog.hide(userData);
          };
        };

        //shows the dialog directive with the above controller
        $mdDialog.show({
          controller: loginWindow,
          controllerAs: 'login',
          template: `
            <md-dialog flex="40" flex-gt-md="30" aria-label="User Login">
              <form name="loginForm" ng-cloak>
                <md-toolbar>
                  <div class="md-toolbar-tools">
                    <h2>Google Login</h2>
                    <span flex></span>
                    <md-button class="md-icon-button" ng-click="login.cancel()">
                      <md-icon aria-label="Close dialog">&#xE14C</md-icon>
                    </md-button>
                  </div>
                </md-toolbar>

                <md-dialog-content>
                  <md-content layout="column" layout-align="center center">
                    <md-input-container>
                      <label>Email</label>
                      <input flex="100" md-autofocus type="email" ng-model="login.email" name="email" required>
                    </md-input-container>
                    <md-input-container>
                      <label>Display Name</label>
                      <input flex="100" ng-model="login.displayName" name="displayName" required>
                    </md-input-container>
                    <md-input-container>
                      <label>Password</label>
                      <input flex="100" type="password" ng-model="login.password" name="password" required>
                    </md-input-container>
                  </md-content>
                </md-dialog-content>
                <md-progress-linear class="md-accent" ng-if="login.showProgress" md-mode="indeterminate"></md-progress-linear>
                <md-dialog-actions layout="row">
                  <div layout="column" flex="100">
                    <div layout="row" layout-align="space-around center">                
                      <md-button ng-click="login.handleLoginButton(login.displayName, login.password)">
                        Login
                      </md-button>
                      <md-button ng-click="login.cancel()">
                        Cancel
                      </md-button>
                    </div>
                    <div layout="row" layout-align="center center">
                      <md-button ng-click="login.handleSocialLogin('google')" aria-label="googleSubmit">
                        <img style="width:200px; height:40px;" src="./images/googlelog.png">
                      </md-button>
                    </div>
                  </div>
                </md-dialog-actions>
              </form>
            </md-dialog>
          `,
          targetEvent: event,
          parent: angular.element(document.body),
          clickOutsideToClose: true,
        })
          .then(function (user) {
            // console.log('answered', user);
            ctrl.user = user;
            ctrl.displayName = user.displayName;
            ctrl.isValidUser = true;
            ctrl.loggedIn = true;
          }, function () {
            // console.log('canceled');
          });
      };

    // ------------------
    // END FIREBASE
    // ------------------

      this.$onInit = () => {
        // Gather all info from cookies we have;
        const userCookie = $cookies.getObject('mycoinsaveruser');

        if (userCookie){
          console.log(' theres a user cookie and it is, ', userCookie)
          ctrl.user = userCookie;
          ctrl.displayName = userCookie.displayName
          ctrl.loggedIn = true;

          // <!-- This will be used to request coinbase API access -->

          // $http({
          //   method: 'GET',
          //   url: '/tokens',
          //   params: userCookie
          // }).then(function(userExists) {
          //   //server should send back list data
          //   // console.log(userExists.data);
          //   if (userExists.data) {
          //     ctrl.isValidUser = true;
          //     ctrl.displayName = userCookie.displayName;
          //     ctrl.user = userCookie;
          //     ctrl.allItineraries = userExists.data.allItineraries;
          //     ctrl.selectedItinerary = '' + ctrl.allItineraries[0].id;
          //     ctrl.handleItineraryChange();
          //     // console.log('logged in ', ctrl.user);
          //   } else {
          //     // console.log('user doesn\'t exist on server');
          //     $cookies.remove('coinsaverapp');
          //   }
            
          // }, function(err) {
          //   console.log('user auth on localhost failed', err);
          // });

        }
      }
    },

    template:
    `
    <!-- Nav Bar -->
    <md-content layout="column" flex>
      <md-nav-bar md-selected-nav-item="$ctrl.currentNavItem" nav-bar-aria-label="navigation links">
        <md-nav-item  ui-sref="home" ui-sref-active="home" md-nav-click="$ctrl.view='home'" name="home">
          Home
        </md-nav-item>
        <md-nav-item ui-sref="stats" ui-sref-active="stats" md-nav-click="$ctrl.view='stats'" name="stats">
          Stats
        </md-nav-item>
        <md-nav-item ui-sref="banks" ui-sref-active="banks" md-nav-click="$ctrl.view='banks'" name="banks">
          Banks
        </md-nav-item>
        <md-nav-item ui-sref="account" ui-sref-active="account" md-nav-click="$ctrl.view='account'" name="account">
          Account
        </md-nav-item>
        <md-button ng-click="$ctrl.testFunc()">
          Work
        </md-button>

        <!-- Spacer -->
        <span class="fill-space"></span>

        <!-- Login / Welcome -->
        <div ng-if="$ctrl.loggedIn === false">
          <md-nav-item md-nav-click="$ctrl.openLoginDialog($event, 'login')" name="login">
            [ Login ]
          </md-nav-item>
        </div>

        <div ng-if="$ctrl.loggedIn === true">
          <md-button>
          Welcome, {{$ctrl.displayName}}
          </md-button>
          <md-button ng-click="$ctrl.logOut()" name="logout">
          [ Log out ]
          </md-button>
        </div>

      </md-nav-bar>

    <!-- Ui Router Body -->
      <ui-view></ui-view>

    </md-content>
  `,
  });

