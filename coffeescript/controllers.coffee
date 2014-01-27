pantherControllers = angular.module('pantherControllers', ['pantherServices', 'ngRoute', 'ui.router'])

pantherControllers.controller('productsController', ['$scope', '$state','$stateParams', 'Product', 'Cart', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Product, Cart, Taxonomy, Defaults) ->
	$scope.root = Defaults.root
	
	Product.find($stateParams.id).$promise.then( (response) ->
		angular.forEach(response.variants, (variant) ->
			if variant.is_master
				$scope.product = variant 
		)
	)

	$scope.addToCart = (item) ->
		# addToCart will return an error if item is not added successfully.
		if Cart.addToCart(item) != true
			$scope.errorMessage = Cart.addToCart(item) 
])

pantherControllers.controller('taxonomiesController', ['$scope', '$state','$stateParams', 'Taxonomy', 'Defaults', ($scope, $state, $stateParams, Taxonomy, Defaults) ->
	$scope.root = Defaults.root

	permalink = $stateParams.taxonomy

	Taxonomy.findByPermalink(permalink).then( (response) ->
		taxonomy = response
		$scope.title = taxonomy.name
		$scope.taxons = taxonomy.taxons
	)
])

pantherControllers.controller('taxonsController', ['$scope', '$state','$stateParams', 'Taxon', 'Defaults', ($scope, $state, $stateParams, Taxon, Defaults) ->
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
