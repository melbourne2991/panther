(function() {

var pantherControllers = angular.module('pantherControllers', ['pantherServices', 'ngRoute', 'ui.router']);

pantherControllers.controller('productsController', [
	'$scope', '$state', '$stateParams', 'Product', 'Cart', 'Taxonomy', 'Defaults', function($scope, $state, $stateParams, Product, Cart, Taxonomy, Defaults) {
		
		$scope.root = Defaults.root;

		Product.find($stateParams.id).$promise.then(function(response) {

			angular.forEach(response.variants, function(variant) {

				if (variant.is_master) {

					$scope.product = variant;

				}
			});

		});

		$scope.addToCart = function(item, quantity) {

			if (quantity > 0) {

				quantity;

			} else {

				quantity = 1;

			}

			Cart.addToCart(item, quantity);
		};
	}
]);

pantherControllers.controller('taxonomiesController', [
	'$scope', '$state', '$stateParams', 'Taxonomy', 'Defaults', function($scope, $state, $stateParams, Taxonomy, Defaults) {

		$scope.root = Defaults.root;

		var permalink = $stateParams.taxonomy;

		Taxonomy.findByPermalink(permalink).then(function(response) {

			var taxonomy = response;

			$scope.title = taxonomy.name;

			$scope.taxons = taxonomy.taxons;

		});

	}
]);

pantherControllers.controller('taxonsController', [
	'$scope', '$state', '$stateParams', 'Taxon', 'Defaults', function($scope, $state, $stateParams, Taxon, Defaults) {
		
		$scope.root = Defaults.root;

		$scope.products_path = Defaults.products_path;

		var permalink = $stateParams.taxonomy + '/' + $stateParams.taxon;

		Taxon.findByPermalink(permalink).then(function(response) {

			var taxon = response;

			$scope.title = taxon.name;

			Taxon.listProducts(taxon.id).$promise.then(function(response) {

				$scope.products = response.products;
				
			});

		});
	}
]);

}).call(this);
