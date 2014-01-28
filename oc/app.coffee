'use strict'

pantherApp = angular.module('pantherApp',[
	'ui.router',
	'ngResource',
	'pantherControllers',
    'pantherServices',
	'pantherDirectives'
])

pantherApp.config(['$stateProvider', ($stateProvider) ->
	$stateProvider

	.state('store', {
		url: '/',
		templateUrl: 'partials/store.html',
	})

	.state('store.product_show', {
		url: 'products/:id',
		views: {
			'main': {
				templateUrl: 'partials/product/product.html',
				controller: 'productsController'
			},
			'header' : {
				templateUrl: 'partials/layout/header.html'
			},
			'sidebar': {
				templateUrl: 'partials/layout/sidebar.html'
			}
		}
	})

	.state('store.taxon_show', {
		url: ':taxonomy/:taxon',
		views: {
			'main': {
				templateUrl:  'partials/taxon/taxon.html',
				controller: 'taxonsController',
			},
			'header' : {
				templateUrl: 'partials/layout/header.html'
			},
			'sidebar': {
				templateUrl: 'partials/layout/sidebar.html'
			}
		}
	})

	.state('store.taxonomy_show', {
		url: ':taxonomy',
		views : {
			'main': {
				templateUrl:  'partials/taxonomy/taxonomy.html',
				controller: 'taxonomiesController',
			},
			'header' : {
				templateUrl: 'partials/layout/header.html'
			},
			'sidebar': {
				templateUrl: 'partials/layout/sidebar.html'
			}			
		}
	})
])