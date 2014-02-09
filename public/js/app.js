'use strict';

(function() {

var pantherApp = angular.module('pantherApp',[

	'ui.router',

	'ngResource',

	'pantherControllers',

    'pantherServices',
    
	'pantherDirectives',

	'pantherAdminControllers',

	'adminLayoutDirectives',

	'adminLayoutAnimations'

]);

pantherApp.config(['$stateProvider', function($stateProvider) {

	$stateProvider

	.state('store', {
		url: '',
		templateUrl: 'partials/store.html'
	})

	.state('admin', {
		abstract: true,
		url: '/admin',
		templateUrl: 'partials/admin/admin.html',
	})

	.state('admin.home', {
		url: '',
		views : {
			'main': {
				templateUrl:  'partials/admin/products/products.html',
				controller: 'productsAdminController',
			},
			'header': {
				templateUrl:  'partials/admin/layout/header.html',
			},	
			'sidebar': {
				templateUrl:  'partials/admin/layout/sidebar.html',
			}			
		}
	})	

	.state('admin.products', {
		url: '/products',
		views : {
			'main': {
				templateUrl:  'partials/admin/products/products.html',
				controller: 'productsAdminController',
			},
			'header': {
				templateUrl:  'partials/admin/layout/header.html',
			},	
			'sidebar': {
				templateUrl:  'partials/admin/layout/sidebar.html',
			}			
		}
	})

	.state('store.product_show', {
		url: '/products/:productId',
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
		url: '/:taxonomy/:taxon',
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
		url: '/:taxonomy',
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
	});




}]);



}).call(this);

