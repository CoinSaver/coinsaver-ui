angular.module('coinsaver', ['ngMaterial', 'firebase', 'ngCookies', 'ui.router'])
.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('light-green', {
      default: '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100', // use shade A100 for the <code>md-hue-3</code> class
    })
  // If you specify less than all of the keys, it will inherit from the
  // default shades
    .accentPalette('green', {
      default: '200', // use shade 200 for default, and keep all other shades the same
    });
})
.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("home");
    }
  });
}])
.config(($stateProvider, $urlRouterProvider) => {
  const homeState = {
    name: 'home',
    url: '/',
    authenticate: false,
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
  };
  const statsState = {
    name: 'stats',
    url: '/stats',
    template: '<stats />',
    authenticate: true,
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  };
  const banksState = {
    name: 'banks',
    url: '/banks',
    template: '<banks />',
    authenticate: true,
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  };
  const accountState = {
    name: 'account',
    url: '/account/:myParam',
    template: '<account />',
    authenticate: true,
    controller: function ($stateParams) {
      // console.log($stateParams)
    },
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  };
  const settingsState = {
    name: 'settings',
    url: '/settings',
    template: '<settings />',
    authenticate: true,
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  };
  $stateProvider.state(homeState);
  $stateProvider.state(statsState);
  $stateProvider.state(banksState);
  $stateProvider.state(accountState);
  $stateProvider.state(settingsState);
  $urlRouterProvider.otherwise("/");
})
.component('myApp', {
  controller($http, $cookies, $firebaseObject, Auth, User, $state) {

    const ctrl = this;

    this.loggedIn = false;
    this.user

    this.view = 'home';

    this.testFunc = function () {
      console.log('The test func has been clicked,');
      // console.log('The current user data is; ');
      // console.log(ctrl.user);
      console.log('Auth options are: ', Auth)
      console.log('Current auth is: ', Auth.$getAuth())
    };

    this.logOut = function () {
      this.loggedIn = false;
      this.user = {};
      $cookies.remove('coinsaveruser');
      Auth.$signOut();
      User.set({})
      location.reload()
    };

    this.login = function (){
        // logwin.showProgress = true;
        Auth.$signInWithPopup('google')
          .then((result) => {
            console.log(`Signed into google as: ${result.user.displayName}`);
            ctrl.user.firebaseId = result.user.uid;
            ctrl.user.accountInfo = result.user;
            ctrl.user.displayName = result.user.displayName;
            ctrl.loggedIn = true;
            ctrl.checkfbUser();
            // location.reload()
          })
    }

    // ------------------
    // BEGIN FIREBASE
    // ------------------
    
    this.checkfbUser = () => {

      console.log('checking if this user exists...')

      var ref = firebase.database().ref('users/' + Auth.$getAuth().uid + '/usersettings');
      // console.log('ref', ref)

      ref.once("value", snapshot => {
        const user = snapshot.val();
        if (user){
          // console.log('THIS USER ALREADY EXISTS, it is:', snapshot.val());
          var signedinuser = Auth.$getAuth(); 
          // console.log('SIGNED IN USER: ', signedinuser);
          // console.log('signed in uid: ', signedinuser.uid);
          console.log('signed in user email: ', signedinuser.email);
          // console.log('signed in user displayName: ', signedinuser.displayName);
        } else {
          console.log('writing a new user')
          ctrl.writefbUser('works','true')
        }
      })
    }


    this.writefbUser = function (property, value) {      
      var currentuser = Auth.$getAuth();
      // console.log('Writing new user, here are items to strip off of: ', currentuser )
      // console.log('Newly Created uid: ', currentuser.uid);
      // console.log('Newly Created user email: ', currentuser.email);
      // console.log('Newly Created user displayName: ', currentuser.displayName);

      $http.post('/usersetup', { currentuser })
      .then((res) => {
        console.log('Usersetup Response Received: ', res.data)
      });           
      
      var ref = firebase.database().ref('users/' + Auth.$getAuth().uid + '/usersettings');
      // var ref = firebase.database().ref('users/' + Auth.$getAuth().uid);
      var obj = {};
      obj[property] = value;

      var usersettings = {
        //// usersettings
        is_purchase_enabled: true,
        purchase_min: 5,
        purchase_max: 0,
        purchase_additional: 0,
        enforce_additional: false,
        enforce_max: false,
        btc_percent: 50, //0 to 100      
        ref_code: '',
        ref_by: '',
        promo_code: '',
        
      }      
      
      ref.set(usersettings);
      // ref.set(obj);
        
      ref.on('value', function(snapshot){
        console.log('the new profile is: ', snapshot.val())
        }, function (errorObject){
        console.log('read failed: ', errorObject)
      })
      
    } 

    // ------------------
    // END FIREBASE
    // ------------------

    this.$onInit = () => {

      setTimeout( () => { 
        ctrl.currentNavitem = $state.current.name;
        console.log(ctrl.currentNavitem)
      }, 0)

      Auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          ctrl.checkfbUser();
          console.log("Signed in as:", firebaseUser.uid);
          let tempUser = firebaseUser;
          User.set(tempUser)
          console.log('factory user is: ', User.get())
          ctrl.user = firebaseUser;
          ctrl.loggedIn = true;
          ctrl.currentNavitem = $state.current.name;
        } else {
          console.log("Signed out");
        }
      });

    };
  },

  template:
  `
  <div ng-if="$ctrl.loggedIn === false">
    <home />
  </div>

  <div layout="column">

    <div layout="row" style="max-height: 42px; background-color: black;">
      <a class="navbar-brand hero-heading" style="font-size: 56px; margin-top: -10px; margin-left: 5px;"> Coinsaver</a>

      <md-nav-bar md-selected-nav-item="$ctrl.currentNavitem" nav-bar-aria-label="navigation links">
        <md-nav-item md-nav-sref="home" name="home" value= "home" ui-sref-active="home">
          Home
        </md-nav-item>
        <md-nav-item md-nav-sref="banks" name="banks" value="banks" ui-sref-active="banks">
          Banks
        </md-nav-item>
        <md-nav-item ui-sref-active="account" md-nav-sref="account({myParam: 'home'})" name="account">
          Wallet
        </md-nav-item>
        <md-nav-item ui-sref="settings" ui-sref-active="settings" md-nav-click="$ctrl.view='account'" name="settings">
          Settings
        </md-nav-item>
      </md-nav-bar>

      <span class="fill-space"></span>
      
      <a style="margin-top: 12px; margin-right: 20px">
        <c style="color: rgba(255,255,255,0.7);">welcome,</c> {{$ctrl.user.displayName}}
          <b ng-click="$ctrl.logOut()" style="margin-left:18px; text-transform:uppercase;"name="logout">
            [ Log out ]
          </b>
        </a>
    </div>

  <main flex>
    <div ng-if="$ctrl.loggedIn === true">

      <!-- Ui Router Body -->
        <ui-view></ui-view>

    </div>
  </main>  

  <footer>
    <div style="min-height: 22px; background-color: black; position:fixed; bottom:0px; width:100%; color: rgba(255,255,255,0.7);" >
        <div layout="row" layout-align="end center">
          <c style="margin-top:2px">&copy; 2017, CoinsaverAPP Dev Team, ARMS Corp.</c>
        </div>
    </div>
  </footer>

  </div>
`,
});