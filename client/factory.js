angular.module('coinsaver')
  .factory('Auth', ['$firebaseAuth',
    function ($firebaseAuth) {
      return $firebaseAuth();
    },
  ])
  .factory('User', () => {
    const state = {
      data: {}
    };

    return {
      get() {
        return state.data;
      },
      set(data) {
        Object.assign(state.data, data);
      },
    };
  })
  .factory('CoinMover', () => {
    const state = {};

    return {
      get() {
        return state;
      },
      set(data) {
        Object.assign(state, data)
      },
    };
  });