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
    .state('productsNew', {
      url: '/products/new',
      templateUrl: '/templates/productsNew.html',
      controller: 'ProductsNewController as productsNew'
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
    })

  //Order Routes
    .state('ordersIndex', {
      url: '/orders',
      templateUrl: '/templates/ordersIndex.html',
      controller: 'OrdersIndexController as ordersIndex'
    })
    .state('ordersNew', {
      url: '/orders/new',
      templateUrl: '/templates/ordersNew.html',
      controller: 'OrdersNewController as ordersNew'
    })

  //Static Route
  .state('home', {
    url: '/',
    templateUrl: '/templates/home.html'
  });

  $urlRouterProvider.otherwise('/products');
}
