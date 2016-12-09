angular.module('finalProject')
  .controller('ProductsIndexController', ProductsIndexController)
  .controller('ProductsNewController', ProductsNewController)
  .controller('ProductsShowController', ProductsShowController)
  .controller('ProductsEditController', ProductsEditController);

ProductsIndexController.$inject = ['Product'];
function ProductsIndexController(Product) {
  const productsIndex = this;

  productsIndex.all = Product.query();
}

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


ProductsShowController.$inject = ['Product','$state', '$auth'];
function ProductsShowController(Product, $state, $auth) {
  const productsShow = this;

  productsShow.product = Product.get($state.params);

  function deleteProduct() {
    console.log('fired!');
    productsShow.product.$remove({id: productsShow.product.id}, () => {
      $state.go('productsIndex');
    });
  }

  productsShow.delete = deleteProduct;
  productsShow.isLoggedIn = $auth.isAuthenticated;
}

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
