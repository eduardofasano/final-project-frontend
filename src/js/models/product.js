angular.module('finalProject')
  .factory('Product', Product);

Product.$inject = ['$resource', 'API_URL'];
function Product($resource, API_URL) {
  return new $resource(`${API_URL}/products/:id`, { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
