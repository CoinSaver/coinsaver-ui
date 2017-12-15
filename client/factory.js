angular.module('coinsaver')
  .factory('Auth', ['$firebaseAuth',
    function ($firebaseAuth) {
      return $firebaseAuth();
    },
  ])
  .factory('User', () => {
    const state = {
      data: {
        user: 'test',
        accounts: ['1', '2', '3'],
      },
    };

    return {
      get() {
        return state.data;
      },
      set(data) {
        Object.assign(state.data, data);
      },
    };
  });