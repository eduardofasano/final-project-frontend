angular.module('finalProject')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then(() => {
        $state.go('login');
      });
  }

  register.submit = submit;
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
      .then(() => {
        $state.go('usersIndex');
      });
  }

  login.submit = submit;
}
