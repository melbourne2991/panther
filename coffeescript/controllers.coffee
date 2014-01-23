sprangularControllers = angular.module('sprangularControllers', ['sprangularServices', 'ngRoute', 'ui.router'])

sprangularControllers.controller('productsController', ['$scope', '$state','$stateParams', 'Product', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Product, Taxonomy, Defaults) ->
	$scope.root = Defaults.root
	
	Product.find($stateParams.id).$promise.then( (response) ->
		$scope.currentProduct = response 
	)

])

sprangularControllers.controller('taxonomiesController', ['$scope', '$state','$stateParams', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Taxonomy, Defaults) ->
	$scope.root = Defaults.root

	id = [$stateParams.taxonomy]
	id.push($stateParams.taxon) if $stateParams.taxon

	Taxonomy.findByPermalink(id).then( (response) ->
		if $stateParams.taxon
			taxon = response[1]
			$scope.title = taxon.name

			Taxonomy.listProducts(taxon.id).$promise.then( (response) ->
				$scope.products = response.products
			)
		else
			taxonomy = response[0]
			$scope.title = taxonomy.name
			$scope.taxons = taxonomy.taxons
	);
])

sprangularControllers.controller('storeView', ['$scope', '$state','$stateParams', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Taxonomy, Defaults) ->
	
	$scope.path = Defaults.root + $state.current.url + '/taxonomies/'

	Taxonomy.taxonomies_with_meta().$promise.then( (response) ->
		$scope.taxonomies = response.taxonomies
	)

	console.log($state)
])

