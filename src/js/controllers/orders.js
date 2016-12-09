angular.module('finalProject')
.controller('OrdersIndexController', OrdersIndexController)
.controller('OrdersNewController', OrdersNewController);
// .controller('OrdersShowController', OrdersShowController)
// .controller('OrdersEditController', OrdersEditController);

//INDEX
OrdersIndexController.$inject = ['Order'];
function OrdersIndexController(Order) {
  const ordersIndex = this;

  ordersIndex.all = Order.query();
}

//NEW
OrdersNewController.$inject = ['Order', '$state','$auth'];
function OrdersNewController(Order, $state, $auth) {
  const ordersNew = this;

  ordersNew.order = {};
  ordersNew.order.product_id = $state.params.id;

  function create() {
    const payload = $auth.getPayload();
    console.log('fired');
    console.log(payload);



    Order.save(ordersNew.order, () => {
      $state.go('ordersShow');
    });
  }

  function addOrder() {
    console.log('give me some cheese!');
  }

  ordersNew.create = create;
  ordersNew.addOrder = addOrder;
}

//SHOW & DELETE
OrdersShowController.$inject = ['Order','$state', '$auth'];
function OrdersShowController(Order, $state, $auth) {
  const ordersShow = this;
  const payload = $auth.getPayload();
  const userId = payload.id ;
  console.log(userId);

  ordersShow.Order = Order.get($state.params);

  function deleteOrder() {
    console.log('fired!');
    ordersShow.order.$remove({id: ordersShow.order.id}, () => {
      $state.go('ordersIndex');
    });
  }

  ordersShow.delete = deleteOrder;
  ordersShow.isLoggedIn = $auth.isAuthenticated;
}
