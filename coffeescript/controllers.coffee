sprangularControllers = angular.module('sprangularControllers', ['sprangularServices', 'ngRoute', 'ui.router'])

sprangularControllers.controller('productsController', ['$scope', '$state','$stateParams', 'Product', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Product, Taxonomy, Defaults) ->
	$scope.root = Defaults.root
	
	Product.find($stateParams.id).$promise.then( (response) ->
		angular.forEach(response.variants, (variant) ->
			if variant.is_master
				$scope.product = variant 
		)
	)
])

sprangularControllers.controller('taxonomiesController', ['$scope', '$state','$stateParams', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Taxonomy, Defaults) ->
	$scope.root = Defaults.root

	permalink = $stateParams.taxonomy

	Taxonomy.findByPermalink(permalink).then( (response) ->
		taxonomy = response
		$scope.title = taxonomy.name
		$scope.taxons = taxonomy.taxons
	)
])

sprangularControllers.controller('taxonsController', ['$scope', '$state','$stateParams', 'Taxon', 'Defaults', ($scope, $state, $stateParams, Taxon, Defaults) ->
	$scope.root = Defaults.root
	$scope.products_path = Defaults.products_path

	permalink = $stateParams.taxonomy + '/' + $stateParams.taxon

	Taxon.findByPermalink(permalink).then( (response) ->
		taxon = response
		$scope.title = taxon.name

		Taxon.listProducts(taxon.id).$promise.then( (response) ->
			$scope.products = response.products
		)
	)
])


sprangularControllers.controller('storeView', ['$scope', '$state','$stateParams', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Taxonomy, Defaults) ->
	
	$scope.store_path = Defaults.store_path

	Taxonomy.taxonomies_with_meta().$promise.then( (response) ->
		$scope.taxonomies = response.taxonomies
	)

])

