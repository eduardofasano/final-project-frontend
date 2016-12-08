angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider

  //User, Register and Login Routes
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })

  //Product Routes
    .state('productsIndex', {
      url: '/products',
      templateUrl: '/templates/productsIndex.html',
      controller: 'ProductsIndexController as productsIndex'
    })
    .state('productsShow', {
      url: '/products/:id',
      templateUrl: '/templates/productsShow.html',
      controller: 'ProductsShowController as productsShow'
    })
    .state('productsEdit', {
      url: '/products/:id/edit',
      templateUrl: '/templates/productsEdit.html',
      controller: 'ProductsEditController as productsEdit'
    });

  $urlRouterProvider.otherwise('/users');
}
