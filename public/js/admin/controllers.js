(function() {

var pantherAdminControllers = angular.module('pantherAdminControllers', ['pantherServices', 'ui.router']);

pantherAdminControllers.controller('adminController', ['$scope', '$state', 'Defaults', function($scope, $state,  Defaults) {
	$scope.go = function(state) {
		$state.go('^.' + state);
	}

	//----- Backdrop -----//

	// Set to off by default.
	$scope.backdropStatus = false;

	// Clicking the backdrop calls backdrop off which then
	// broadcasts to any directive with the backdrop listener
	$scope.backdropOff = function() {
		$scope.$broadcast('backdrop_off');
	}

	$scope.backdropSwitch = function() {
		if($scope.backdropStatus === false) {
			$scope.backdropStatus = true;
		} else {
			$scope.backdropStatus = false;
		}
	}
}]);

pantherAdminControllers.controller('productsAdminController', ['$scope', '$stateParams', 'Product', 'Defaults', function($scope, $stateParams, Product) {
	$scope.queryProducts = function() {
		Product.all().$promise.then(function(response) {
			$scope.products = response;
		});	
	};

	$scope.queryProducts();

	$scope.addNewProduct = function() {
		var newProductObject = new Product($scope.newProductObject);
		newProductObject.$save(function(response, headers) {
			if (!response.err) {
				queryProducts();
			} else {
				console.log(response.err)
			}
		});
	};

	$scope.openProductEditor = function(product) {
		// Turn backdrop on
		$scope.backdropSwitch();

		// Directive will behave differently for new products
		// If the product is not new, the product object is passed
		// in for manipulation
		if(product === 'new') {
			$scope.selectedProduct = Product.schema();
		} 
		else {
			$scope.selectedProduct = product;
		}
	}

	$scope.closeProductEditor = function(product) {
		// Revert back to null, hides directive
		$scope.selectedProduct = null;

		// Turns backdrop off
		$scope.backdropSwitch();
	}

	$scope.$on('backdrop_off', function() {
		$scope.closeProductEditor();
	});

}]);

}).call(this);

