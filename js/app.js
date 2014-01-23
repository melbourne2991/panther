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

	.state('home', {
		url: '/',
		templateUrl: 'partials/home.html'
	})

	.state('store', {
		url: '/store',
		templateUrl: 'partials/store.html',
		controller: 'storeView'
	})

	.state('store.product_show', {
		url: '/products/:id',
		templateUrl: 'partials/product.html',
		controller: 'productsController'
	})

	.state('store.taxonomy_show', {
		url: '/taxonomies/:taxonomy?taxon',
		templateUrl:  'partials/taxonomy.html',
		controller: 'taxonomiesController',
	});

}]);