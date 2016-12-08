angular.module('finalProject')
  .controller('ProductsIndexController', ProductsIndexController)
  .controller('ProductsShowController', ProductsShowController)
  .controller('ProductsEditController', ProductsEditController);

ProductsIndexController.$inject = ['Product'];
function ProductsIndexController(Product) {
  const productsIndex = this;

  productsIndex.all = Product.query();
}

ProductsShowController.$inject = ['Product','$state', '$auth'];
function ProductsShowController(Product, $state, $auth) {
  const productsShow = this;

  productsShow.product = Product.get($state.params);

  function deleteProduct() {
    productsShow.product.$remove(() => {
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
