'use strict';

var $stateProviderReference;

var sprangularApp = angular.module('sprangularApp',[
	'ui.router',
	'ngResource',
	'sprangularControllers',
    'sprangularServices',
	'sprangularDirectives'
]);

sprangularApp.config(['$stateProvider', function($stateProvider) {

	$stateProvider

	.state('store', {
		url: '/',
		templateUrl: 'partials/store.html',
		controller: 'storeView'
	})

	.state('store.product_show', {
		url: 'products/:id',
		views: {
			'main': {
				templateUrl: 'partials/product.html',
				controller: 'productsController'
			},
			'sidebar': {
				templateUrl: 'partials/sidebar.html'
			}
		}
	})

	.state('store.taxon_show', {
		url: ':taxonomy/:taxon',
		views: {
			'main': {
				templateUrl:  'partials/taxon.html',
				controller: 'taxonsController',
			},
			'sidebar': {
				templateUrl: 'partials/sidebar.html'
			}
		}
	})

	.state('store.taxonomy_show', {
		url: ':taxonomy',
		views : {
			'main': {
				templateUrl:  'partials/taxonomy.html',
				controller: 'taxonomiesController',
			},
			'sidebar': {
				templateUrl: 'partials/sidebar.html'
			}			
		}
	});

}]);