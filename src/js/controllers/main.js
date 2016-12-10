angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth','$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;
  const payload = $auth.getPayload();
  const user = payload;
  main.user = user;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('usersIndex');
      });
  }

  const protectedStates = ['usersEdit'];

  function secureState(e, toState) {
    main.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
    // Check whether or not the current user is a seller
    if($auth.isAuthenticated()){
      main.isSeller = $auth.getPayload().role === 'seller';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
