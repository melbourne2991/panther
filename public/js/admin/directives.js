var pantherAdminDirectives = angular.module('pantherAdminDirectives', ['pantherServices']);

pantherAdminDirectives.directive('productEditor', [ 'Product', function(Product) {
	return {
		scope: {
			product: '=',
			queryProducts: '=query',
			closeEditor: '=close'
		},
		template: 	'<h2 ng-switch="productIsNew">' +
					'<span ng-switch-when="true">Add a product</span>' +
					'<span ng-switch-default>Editing: {{ product.name }}</span>' +
					'</h2>' +
					'<div>Name: 	   <input ng-model="product.name" type="text" ng-click="testz()"></div>' +
					'<div>Description: <input ng-model="product.description" type="text"></div>' +
					'<div>Price: 	   <input ng-model="product.price" type="text"></div>' +
					'<button ng-click="saveProduct()">Save Changes</button>'
					,
		controller: function($scope) {	
			$scope.saveProduct = function() {
				var newProduct = new Product($scope.product);

				newProduct.$save(function(response, headers) {
					if (!response.err) {
						$scope.queryProducts();
						$scope.closeEditor();
					} else {
						console.log(response.err)
					}
				});
			};
		},
		link: function(scope, element, attrs) {
			console.log(scope);
		}
	}
}]);