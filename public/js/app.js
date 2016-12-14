"use strict";function Auth(e,r){e.loginUrl=r+"/login",e.signupUrl=r+"/register",e.tokenPrefix=""}function RegisterController(e,r){function t(){e.signup(o.user).then(function(){r.go("login")})}var o=this;o.user={},o.submit=t}function LoginController(e,r){function t(){e.login(o.credentials).then(function(){r.go("productsIndex")})}var o=this;o.credentials={},o.submit=t}function MainController(e,r,t){function o(){e.logout().then(function(){r.go("usersIndex")})}function n(t,o){l.message=null,!e.isAuthenticated()&&c.includes(o.name)&&(t.preventDefault(),r.go("login"),l.message="You must be logged in to go there!"),e.isAuthenticated()&&(l.isSeller="seller"===e.getPayload().role)}var l=this,i=e.getPayload(),u=i;l.user=u,l.isLoggedIn=e.isAuthenticated,l.message=null;var c=["usersEdit"];t.$on("$stateChangeStart",n),l.logout=o}function Order(e,r){return new e(r+"/orders/:id",{id:"@_id"},{update:{method:"PUT"}})}function OrdersIndexController(e,r,t,o,n,l){function i(e){console.log("clicked, add one"),e.quantity++,console.log(e.quantity)}function u(e){console.log("clicked, add one"),e.quantity--,console.log(e.quantity)}function c(r){var n=r.quantity,i=r.product;console.log("Before deleted order; product.current_quantity:",i.current_quantity),console.log("orderQuantity:",n),t.delete({id:r.id},function(){var t=p.all.indexOf(r);p.all.splice(t,1),i.current_quantity-=n,console.log("BEFORE product.final_price:",i.final_price),i.final_price=l.calculateCurrentPricePerUnit(i.min_price,i.max_price,i.quantity,i.current_quantity),console.log("  product.min_price:",i.min_price),console.log("  product.max_price:",i.max_price),console.log("  product.quantity:",i.quantity),console.log("  product.current_quantity:",i.current_quantity),console.log("AFTER product.final_price:",i.final_price),e.update({id:i.id},i,function(e){console.log("After deleted order; updatedProduct.current_quantity:",e.current_quantity),o.go("ordersIndex")})})}function d(r){t.get({id:r.id}).$promise.then(function(n){p.orderId=n.id,console.log("order.originalQuantity: ",r.originalQuantity),e.get({id:r.product.id}).$promise.then(function(n){p.orderId=n.id;var i=n.current_quantity;console.log("originalCurrentQuantity: ",i),console.log("editedOrderedQuantity: ",r.quantity),n.current_quantity=i-r.originalQuantity+r.quantity,console.log("edited current quantity",n.current_quantity),t.update({id:r.id},r,function(){console.log("BEFORE product.final_price:",n.final_price),n.final_price=l.calculateCurrentPricePerUnit(n.min_price,n.max_price,n.quantity,n.current_quantity),console.log("  product.min_price:",n.min_price),console.log("  product.max_price:",n.max_price),console.log("  product.quantity:",n.quantity),console.log("  product.current_quantity:",n.current_quantity),console.log("AFTER product.final_price:",n.final_price),e.update({id:n.id},n,function(e){console.log("updatedProduct.current_quantity:",e.current_quantity),console.log("updatedProduct.final_price:",e.final_price)}),o.go("ordersIndex")})})})}function s(e){console.log("clicked"),console.log(e),e.showOrderList=!e.showOrderList}function a(e){console.log("clicked"),e.showEditFormValue=!e.showEditFormValue}var p=this,g=n.getPayload(),f=g;p.user=f,p.showEditFormValue=!1,p.all=t.query({buyer_id:n.getPayload().id}),p.all.$promise.then(function(e){console.log("orders:",e),e.forEach(function(e){e.originalQuantity=e.quantity})}),r.get({id:f.id}).$promise.then(function(e){p.currentUser=e}),p.showOrders=s,p.plusOne=i,p.minusOne=u,p.delete=c,p.update=d,p.toggleEditForm=a}function OrdersNewController(e,r,t){function o(){r.save(n.order,function(){t.go("ordersIndex")})}var n=this;n.order={},n.order.product_id=t.params.id,n.create=o}function PriceHelper(){return{calculateCurrentPricePerUnit:function(e,r,t,o){return(e-r)/(t-0)*o+r}}}function Product(e,r){return new e(r+"/products/:id",{id:"@id"},{update:{method:"PUT"}})}function ProductsIndexController(e){var r=this;r.all=e.query(),r.queryString="",r.filter={name:""}}function ProductsNewController(e,r,t){function o(){var o=t.getPayload();console.log("fired"),console.log(o),e.save(n.product,function(){r.go("productsIndex")})}var n=this;n.product={},n.create=o}function ProductsShowController(e,r,t,o,n){function l(){var e=s.product.orders.map(function(e){return e.buyer.id});return e.includes(a.id)}function i(){console.log("clicked, add one"),s.order.quantity++,console.log(s.order.quantity)}function u(){console.log("clicked, add one"),s.order.quantity--,console.log(s.order.quantity)}function c(){console.log("fired!"),s.product.$remove({id:s.product.id},function(){t.go("productsIndex")})}function d(){r.save(s.order,function(r){s.product.current_quantity+=r.quantity,s.product.final_price=n.calculateCurrentPricePerUnit(s.product.min_price,s.product.max_price,s.product.quantity,s.product.current_quantity),e.update({id:s.product.id},s.product,function(){t.go("ordersIndex")})})}var s=this,a=o.getPayload(),p=a.id,g=.2;console.log(p),e.get(t.params).$promise.then(function(e){s.product=e,console.log(s.product.orders);var r=s.product.quantity*g;s.maxOrderSize=r,s.order.quantity=1,console.log(r),s.product.seller.id===p&&(s.isOwnProduct=!0,console.log(s.product.seller.id),console.log(s.isOwnProduct)),s.countdown=moment().diff(new moment(s.product.enddate))*-1/1e3,console.log(s.countdown)}),s.order={product_id:t.params.id},s.checkForOrders=l,s.plusOne=i,s.minusOne=u,s.delete=c,s.isLoggedIn=o.isAuthenticated,s.createOrder=d}function ProductsEditController(e,r,t){function o(){e.update({id:n.product.id},n.product,function(){r.go("productsShow",r.params)})}var n=this;n.product=e.get(r.params),n.update=o,n.isLoggedIn=t.isAuthenticated}function Router(e,r){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("productsIndex",{url:"/products",templateUrl:"/templates/productsIndex.html",controller:"ProductsIndexController as productsIndex"}).state("productsNew",{url:"/products/new",templateUrl:"/templates/productsNew.html",controller:"ProductsNewController as productsNew"}).state("productsShow",{url:"/products/:id",templateUrl:"/templates/productsShow.html",controller:"ProductsShowController as productsShow"}).state("productsEdit",{url:"/products/:id/edit",templateUrl:"/templates/productsEdit.html",controller:"ProductsEditController as productsEdit"}).state("ordersIndex",{url:"/orders",templateUrl:"/templates/ordersIndex.html",controller:"OrdersIndexController as ordersIndex"}).state("ordersNew",{url:"/orders/new",templateUrl:"/templates/ordersNew.html",controller:"OrdersNewController as ordersNew"}),r.otherwise("/products")}function User(e,r){return new e(r+"/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UsersIndexController(e){var r=this;r.all=e.query()}function UsersShowController(e,r,t){function o(){n.user.$remove(function(){r.go("productsIndex")})}var n=this;n.user=e.get(r.params),n.delete=o,n.isLoggedIn=t.isAuthenticated}function UsersEditController(e,r,t){function o(){e.update({id:n.user.id},n.user,function(){r.go("usersShow",r.params)})}var n=this;n.user=e.get(r.params),n.update=o,n.isLoggedIn=t.isAuthenticated}angular.module("finalProject",["ngResource","ui.router","satellizer","timer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").factory("Order",Order),Order.$inject=["$resource","API_URL"],angular.module("finalProject").controller("OrdersIndexController",OrdersIndexController).controller("OrdersNewController",OrdersNewController),OrdersIndexController.$inject=["Product","User","Order","$state","$auth","PriceHelper"],OrdersNewController.$inject=["Product","Order","$state"],angular.module("finalProject").factory("PriceHelper",PriceHelper),angular.module("finalProject").factory("Product",Product),Product.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ProductsIndexController",ProductsIndexController).controller("ProductsNewController",ProductsNewController).controller("ProductsShowController",ProductsShowController).controller("ProductsEditController",ProductsEditController),ProductsIndexController.$inject=["Product"],ProductsNewController.$inject=["Product","$state","$auth"],ProductsShowController.$inject=["Product","Order","$state","$auth","PriceHelper"],ProductsEditController.$inject=["Product","$state","$auth"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state","$auth"];
//# sourceMappingURL=app.js.map
