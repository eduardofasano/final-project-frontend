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
ProductsShowController.$inject = ['Product','$state', '$auth'];
function ProductsShowController(Product, $state, $auth) {
  const productsShow = this;
  const payload = $auth.getPayload();
  const userId = payload.id ;
  console.log(userId);
  productsShow.isOwnProduct = false;

  Product.get($state.params).$promise.then((data) => {
    productsShow.product = data;
    console.log(productsShow.product);
    if(productsShow.product.seller.id === userId) {
      productsShow.isOwnProduct = true;
      console.log(productsShow.product.seller.id);
      console.log(productsShow.isOwnProduct);
    }
  });

  function deleteProduct() {
    console.log('fired!');
    productsShow.product.$remove({id: productsShow.product.id}, () => {
      $state.go('productsIndex');
    });
  }

  productsShow.delete = deleteProduct;
  productsShow.isLoggedIn = $auth.isAuthenticated;
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
