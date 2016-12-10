angular.module('finalProject')
.controller('OrdersIndexController', OrdersIndexController)
.controller('OrdersNewController', OrdersNewController);
// .controller('OrdersShowController', OrdersShowController);
// .controller('OrdersEditController', OrdersEditController);

//INDEX
OrdersIndexController.$inject = ['User','Order', '$state', '$auth'];
function OrdersIndexController(User, Order, $state, $auth) {
  const ordersIndex = this;
  const payload = $auth.getPayload();
  const user = payload;
  ordersIndex.user = user;

  ordersIndex.showEditFormValue = false;

  ordersIndex.all = Order.query({ buyer_id: $auth.getPayload().id });

  User.get({id: user.id}).$promise.then((data) => {
    ordersIndex.currentUser = data;
  });

  function deleteOrder(order) {
    Order.delete({id: order.id}, () => {
      const index = ordersIndex.all.indexOf(order);
      ordersIndex.all.splice(index, 1);
      $state.go('ordersIndex');
    });
  }

  function updateOrder(order) {
    console.log('clicked');
    console.log(order.id);
    Order.update({id: order.id});
  }

  function showOrders(product) {
    console.log('clicked');
    console.log(product);
    product.showOrderList = !product.showOrderList;
  }

  function toggleEditForm(order) {
    console.log('clicked');
    order.showEditFormValue = !order.showEditFormValue;
  }

  ordersIndex.showOrders = showOrders;
  ordersIndex.delete = deleteOrder;
  ordersIndex.updateOrder = updateOrder;
  ordersIndex.toggleEditForm = toggleEditForm;
}

//NEW
OrdersNewController.$inject = ['Order', '$state'];
function OrdersNewController(Order, $state) {
  const ordersNew = this;

  ordersNew.order = {};
  ordersNew.order.product_id = $state.params.id;

  function create() {
    // const payload = $auth.getPayload();

    Order.save(ordersNew.order, () => {
      $state.go('ordersIndex');
    });
  }
  ordersNew.create = create;
}

// //SHOW & DELETE
// OrdersShowController.$inject = ['Order','$state', '$auth'];
// function OrdersShowController(Order, $state, $auth) {
//   const ordersShow = this;
//   const payload = $auth.getPayload();
//   const userId = payload.id ;
//   console.log(userId);
//
//   ordersShow.Order = Order.get($state.params);
//
//   ordersShow.isLoggedIn = $auth.isAuthenticated;
// }
