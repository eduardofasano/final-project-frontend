angular.module('finalProject')
.controller('OrdersIndexController', OrdersIndexController)
.controller('OrdersNewController', OrdersNewController);
// .controller('OrdersShowController', OrdersShowController);
// .controller('OrdersEditController', OrdersEditController);

//INDEX
OrdersIndexController.$inject = ['Product','User','Order', '$state', '$auth'];
function OrdersIndexController(Product, User, Order, $state, $auth) {
  const ordersIndex = this;
  const payload = $auth.getPayload();
  const user = payload;
  ordersIndex.user = user;

  ordersIndex.showEditFormValue = false;

  ordersIndex.all = Order.query({ buyer_id: $auth.getPayload().id });

  ordersIndex.all.$promise.then((orders) => {
    console.log('orders:', orders);
    orders.forEach(order => {
      order.originalQuantity = order.quantity;
    });
  });

  User.get({id: user.id}).$promise.then((data) => {
    ordersIndex.currentUser = data;
  });

  function deleteOrder(order) {
    const orderQuantity = order.quantity;
    const product = order.product;

    console.log('Before deleted order; product.current_quantity:', product.current_quantity);
    console.log('orderQuantity:', orderQuantity);
    Order.delete({id: order.id}, () => {
      const index = ordersIndex.all.indexOf(order);
      ordersIndex.all.splice(index, 1);
      product.current_quantity -= orderQuantity;
      Product.update({id: product.id}, product, (updatedProduct) => {
        console.log('After deleted order; updatedProduct.current_quantity:', updatedProduct.current_quantity);
        $state.go('ordersIndex');
      });
    });
  }

  function update(order) {
    Order.get({id: order.id}).$promise.then((data) => {
      ordersIndex.orderId = data.id;
      console.log('order.originalQuantity: ', order.originalQuantity);

      Product.get({id: order.product.id}).$promise.then((data) => {
        ordersIndex.orderId = data.id;
        const product = data;
        const originalCurrentQuantity = (data.current_quantity);
        const productId = data.id;
        console.log('originalCurrentQuantity: ', originalCurrentQuantity);
        console.log('productId: ', productId);
        console.log('editedOrderedQuantity: ', order.quantity);

        product.current_quantity = (originalCurrentQuantity - order.originalQuantity + order.quantity);
        console.log('edited current quantity', product.current_quantity);

        Order.update({id: order.id}, order, () => {
          Product.update({id: productId}, product, (updatedProduct) => {
            console.log('updatedProduct.current_quantity:', updatedProduct.current_quantity);
          });
          $state.go('ordersIndex');
        });
      });
    });
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
  ordersIndex.update = update;
  ordersIndex.toggleEditForm = toggleEditForm;
}

//NEW
OrdersNewController.$inject = ['Product','Order', '$state'];
function OrdersNewController(Product, Order, $state) {
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
