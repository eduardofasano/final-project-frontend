angular.module('finalProject')
  .factory('Order', Order);

Order.$inject = ['$resource', 'API_URL'];
function Order($resource, API_URL) {
  return new $resource(`${API_URL}/orders/:id`, { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}
