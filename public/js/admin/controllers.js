(function() {

var pantherAdminControllers = angular.module('pantherAdminControllers', ['pantherServices', 'ui.router']);

pantherAdminControllers.controller('adminController', ['$scope', '$state', 'Defaults', function($scope, $state,  Defaults) {
	$scope.go = function(state) {
		$state.go('^.' + state);
	}

	$scope.backdropSwitch = null;
	$scope.$on('backdrop', function(event, backdropSwitch) {
		$scope.backdropSwitch = backdropSwitch;
	});
}]);

pantherAdminControllers.controller('productsAdminController', ['$scope', '$stateParams', 'Product', 'Defaults', function($scope, $stateParams, Product) {

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

	$scope.selectedProduct = null;
	$scope.openProductEditor = function(product) {
		$scope.$emit('backdrop', true);
		$scope.selectedProduct = product;
	}

}])

}).call(this);

