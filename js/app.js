'use strict';

var $stateProviderReference;

var sprangularApp = angular.module('sprangularApp',[
	'ui.router',
	'ngResource',
	
	'sprangularControllers',
    // 'sprangularFilters',
    'sprangularServices',
	'sprangularDirectives'
]);

sprangularApp.config(['$stateProvider', function($stateProvider) {

	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'partials/home.html'
	})

	.state('product_show', {
		url: '/products/:id',
		templateUrl: 'partials/product.html',
		controller: 'productsController'
	})

	.state('taxonomy_show', {
		url: '/taxonomies/:taxonomy?taxon',
		templateUrl:  'partials/taxonomy.html',
		controller: 'taxonomiesController',
	});

	//Generate Taxonomy Routes
	// $.when( $.get('http://0.0.0.0:3000/api/taxonomies') ).done(function(response) {

	// 	var lol = "shehzzz";
	// 	console.log('first> ' + lol)

	// 	for(var i=0; i < response.taxonomies.length; i++) {
	// 		var taxonomy = response.taxonomies[i].root;
	// 		var resource_id;
			
	// 		resource_id = [taxonomy.id];

	// 		$stateProvider.state(taxonomy.permalink + '_show', {
	// 			url: '/' + taxonomy.permalink,
	// 			templateUrl: 'partials/taxonomy.html',
	// 			controller: 'taxonomiesController',
	// 			resourceId: resource_id
	// 		});

	// 		for(var i=0; i < taxonomy.taxons.length; i++) {
	// 			var taxon = taxonomy.taxons[i];

	// 			resource_id = [taxonomy.id, taxonomy.parent_id];

	// 			$stateProvider.state(taxon.permalink + '_show', {
	// 				url: '/' + taxon.permalink,
	// 				templateUrl: 'partials/taxonomy.html',
	// 				controller: 'taxonomiesController',
	// 				resourceId: resource_id
	// 			});
	// 		}
	// 	}

	// });
}]);