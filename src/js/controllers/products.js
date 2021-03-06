angular.module('finalProject')
.controller('ProductsIndexController', ProductsIndexController)
.controller('ProductsNewController', ProductsNewController)
.controller('ProductsShowController', ProductsShowController)
.controller('ProductsEditController', ProductsEditController);

//INDEX
ProductsIndexController.$inject = ['Product'];
function ProductsIndexController(Product) {
  const productsIndex = this;

  productsIndex.all = Product.query();
  productsIndex.queryString = '';

  productsIndex.filter = { name: ''};
}

//NEW
ProductsNewController.$inject = ['Product', '$state','$auth'];
function ProductsNewController(Product, $state, $auth) {
  const productsNew = this;

  productsNew.product = {};

  function create() {
    const payload = $auth.getPayload();
    console.log('fired');
    console.log(payload);

    Product.save(productsNew.product, () => {
      $state.go('productsIndex');
    });
  }
  productsNew.create = create;
}

//SHOW & DELETE
ProductsShowController.$inject = ['Product', 'Order', '$state', '$auth', 'PriceHelper', '$window'];
function ProductsShowController(Product, Order, $state, $auth, PriceHelper, $window) {
  const productsShow = this;
  const payload = $auth.getPayload();
  const userId = payload.id;
  const maxOrderRatio = .20;
  console.log(userId);
  // productsShow.isOwnProduct = false;
  productsShow.product = null;
  Product.get($state.params).$promise.then((data) => {
    productsShow.product = data;
    console.log(productsShow.product.orders);

    const maxOrderSize = (productsShow.product.quantity)*(maxOrderRatio);
    productsShow.maxOrderSize = maxOrderSize;
    // productsShow.countdown = parseInt(productsShow.product.duration)*60*60;
    productsShow.order.quantity = 1;
    console.log(maxOrderSize);

    if(productsShow.product.seller.id === userId) {
      productsShow.isOwnProduct = true;
      console.log(productsShow.product.seller.id);
      console.log(productsShow.isOwnProduct);
    }

    //TIME CALCULATION
    if ($window.moment().diff(new $window.moment(productsShow.product.enddate))*-1/1000 > 0) {
      productsShow.countdown = $window.moment().diff(new $window.moment(productsShow.product.enddate))*-1/1000;
    } else {
      productsShow.countdown = 0;
    }

    // productsShow.countdown = 0;
    console.log(productsShow.countdown);

  });

  function checkForOrders() {
    const buyerIds = productsShow.product.orders.map((order) => {
      return order.buyer.id;
    });

    return buyerIds.includes(payload.id);
  }

  function plusOne() {
    console.log('clicked, add one');
    productsShow.order.quantity++;
    console.log(productsShow.order.quantity);
  }

  function minusOne() {
    console.log('clicked, add one');
    productsShow.order.quantity--;
    console.log(productsShow.order.quantity);
  }

  function deleteProduct() {
    console.log('fired!');
    productsShow.product.$remove({id: productsShow.product.id}, () => {
      $state.go('productsIndex');
    });
  }

  productsShow.order = {
    product_id: $state.params.id
  };

  function createOrder() {
    Order.save(productsShow.order, (orderSaved) => {
      productsShow.product.current_quantity += orderSaved.quantity;
      productsShow.product.final_price = PriceHelper.calculateCurrentPricePerUnit(
        productsShow.product.min_price,
        productsShow.product.max_price,
        productsShow.product.quantity,
        productsShow.product.current_quantity
      );
      Product.update({id: productsShow.product.id}, productsShow.product, () => {
        $state.go('ordersIndex');
      });
    });
  }

  productsShow.checkForOrders = checkForOrders;
  productsShow.plusOne = plusOne;
  productsShow.minusOne = minusOne;
  productsShow.delete = deleteProduct;
  productsShow.isLoggedIn = $auth.isAuthenticated;
  productsShow.createOrder = createOrder;
}

//EDIT CONTROLLER
ProductsEditController.$inject = ['Product','$state', '$auth'];
function ProductsEditController(Product, $state, $auth) {
  const productsEdit = this;

  productsEdit.product = Product.get($state.params);

  function update() {
    Product.update({id: productsEdit.product.id}, productsEdit.product, () => {
      $state.go('productsShow', $state.params);
    });
  }

  productsEdit.update = update;
  productsEdit.isLoggedIn = $auth.isAuthenticated;
}
