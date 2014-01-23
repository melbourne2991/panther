sprangularDirectives = angular.module('sprangularDirectives', [])

sprangularDirectives.directive('productDirective', ->
	scope: {
		product: '='
	},
	templateUrl: 'partials/product/_product.html',
	controller: ($scope) ->
		$scope.$watch('product', (newVal) ->
			if newVal 
				angular.forEach($scope.product.variants, (variant) ->
					if variant.is_master
						image_positions = new Array()

						angular.forEach(variant.images, (image) ->
							image_positions[image.position] = {
								mini: image.mini_url,
								small: image.small_url,
								medium: image.product_url,
								large: image.large_url
							} 
						)

						$scope.sorted_images = new Array()
						for i in image_positions
							if i
								$scope.sorted_images.push(i)
				)

				$scope.currentImage = 0

				$scope.updateCurrentImage = ->
					if $scope.currentImage >= ($scope.sorted_images.length - 1)
						console.log($scope.currentImage)
						$scope.currentImage = 0
					else
						console.log($scope.currentImage)
						$scope.currentImage++

				$scope.showClickedImage = (image_number) ->
					$scope.currentImage = image_number
		, true)
	,
	link: (scope, el, attrs) ->

)