(function() {

var pantherAdminControllers = angular.module('pantherAdminControllers', ['pantherServices', 'ui.router']);

pantherAdminControllers.controller('productsAdminController', ['$scope', '$stateParams', 'Product', function($scope, $stateParams, Product) {

	var queryProducts = function() {
		Product.all().$promise.then(function(response) {
			$scope.products = response;
		});	
	};

	queryProducts();

	$scope.newProduct = {
		name: null,
		description: null,
		price: null,
		display_price: null,
		date_available: null
	};

	$scope.addNewProduct = function() {
		var newProduct = new Product($scope.newProduct);
		newProduct.$save(function(response, headers) {
			if (!response.err) {
				queryProducts();
			} else {
				console.log(response.err)
			}
		});
	};

}])

}).call(this);