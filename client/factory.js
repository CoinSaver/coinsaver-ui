angular.module('coinsaver')
.factory('Auth', ['$firebaseAuth', 
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
