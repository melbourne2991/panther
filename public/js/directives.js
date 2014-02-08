(function() {

var pantherDirectives = angular.module('pantherDirectives', ['pantherServices']);

pantherDirectives.directive('productImageGallery', function() {
	return {
		scope: {
			images: '='
		},
		templateUrl: 'partials/directives/product_image_gallery.html',
		controller: function($scope) {
			$scope.$watch('images', function(newVal) {

				var i, image_positions, _i, _len;

				if (newVal) {

					image_positions = new Array();

					angular.forEach($scope.images, function(image) {

						image_positions[image.position] = {

							mini: image.mini_url,

							small: image.small_url,

							medium: image.product_url,

							large: image.large_url

						};

					});

					$scope.sorted_images = new Array();

					for (_i = 0, _len = image_positions.length; _i < _len; _i++) {

						i = image_positions[_i];

						if (i) {
							$scope.sorted_images.push(i);
						}

					}

					$scope.currentImage = 0;

					$scope.updateCurrentImage = function() {

						if ($scope.currentImage >= ($scope.sorted_images.length - 1)) {

							console.log($scope.currentImage);

							$scope.currentImage = 0;

						} else {

							console.log($scope.currentImage);

							$scope.currentImage++;

						}

					};
					
					$scope.showClickedImage = function(image_number) {
						
						$scope.currentImage = image_number;

					};

				}
			}, true);
		},
		link: function(scope, el, attrs) {}
	};
});

pantherDirectives.directive('taxonomiesList', ['Taxonomy', 'Defaults', function(Taxonomy, Defaults) {
		return {
			scope: {},
			templateUrl: 'partials/directives/taxonomies_list.html',
			controller: function($scope) {

				$scope.store_path = Defaults.store_path;

				Taxonomy.taxonomies_with_meta().$promise.then(function(response) {

					$scope.taxonomies = response.taxonomies;

				});
				
			},
			link: function(scope, el, attrs) {}
		};
	}
]);

pantherDirectives.directive('shoppingCart', ['Cart', function(Cart) {
		return {
			scope: {},
			templateUrl: 'partials/directives/shopping_cart.html',
			controller: function($scope) {

				$scope.cartItems = Cart.currentItems;

			}
		};
	}
]);

// pantherDirectives.directive('viewFrame', [function($scope, $rootScope, $timeout) {
// 	return {
// 		controller: function($scope, $element) {
// 			var width = function() {
// 				return $element.width();
// 			} 
		
// 			var getBreakpoint = function() {
// 				var windowWidth = window.innerWidth;

// 				if(windowWidth < 768) {
// 					return 'extra small';
// 				} else if (windowWidth >= 768 && windowWidth < 992) {
// 					return 'small';
// 				} else if (windowWidth >= 992 && windowWidth < 1200) {
// 					return 'medium';
// 				} else if (windowWidth >= 1200) {
// 					return 'large';
// 				}					
// 			}

// 			currentBreakpoint = getBreakpoint();

// 			angular.element(window).bind('resize', function() {
// 				var newBreakpoint = getBreakpoint();
// 				var previousBreakpoint = null;

// 				if (newBreakpoint != currentBreakpoint) {
// 					previousBreakpoint = currentBreakpoint;
// 					currentBreakpoint = newBreakpoint;
// 				}

// 				$scope.$broadcast('windowResize', currentBreakpoint, previousBreakpoint);
// 			});	
// 		}
// 	}
// }]);

// pantherDirectives.directive('sidebar', function($timeout) {
// 	return {
// 		controller: function($scope, $element) {
// 			$scope.$on('windowResize', function(event, newBreakpoint, previousBreakpoint) {
// 				console.log(newBreakpoint);
// 			});
// 		}
// 	}
// });

}).call(this);
