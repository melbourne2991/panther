pantherDirectives = angular.module('pantherDirectives', [])

pantherDirectives.directive('productImageGallery', ->
	scope: {
		images: '='
	},
	templateUrl: 'partials/directives/product_image_gallery.html',
	controller: ($scope) ->
		$scope.$watch('images', (newVal) ->
			if newVal

				image_positions = new Array()

				angular.forEach($scope.images, (image) ->
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

pantherDirectives.directive('taxonomiesList', ['Taxonomy', 'Defaults', (Taxonomy, Defaults) ->
	scope: {},
	templateUrl: 'partials/directives/taxonomies_list.html',
	controller: ($scope) ->
		console.log('shneh')

		$scope.store_path = Defaults.store_path

		Taxonomy.taxonomies_with_meta().$promise.then( (response) ->
			$scope.taxonomies = response.taxonomies

			console.log($scope.taxonomies)
		)
	,
	link: (scope, el, attrs) ->
])