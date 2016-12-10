angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;
  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User','$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;

  usersShow.user = User.get($state.params);

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('productsIndex');
    });
  }

  usersShow.delete = deleteUser;
  usersShow.isLoggedIn = $auth.isAuthenticated;
}

UsersEditController.$inject = ['User','$state', '$auth'];
function UsersEditController(User, $state, $auth) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    User.update({id: usersEdit.user.id}, usersEdit.user, () => {
      $state.go('usersShow', $state.params);
    });
  }

  usersEdit.update = update;
  usersEdit.isLoggedIn = $auth.isAuthenticated;
}
