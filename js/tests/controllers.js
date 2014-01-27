'use strict';


describe('productsController', function() {
	var scope, $httpBackend, createController;
	var api_root = 'http://0.0.0.0:3000/api/';

	beforeEach(angular.mock.module('sprangularApp'));
	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');

		//Get mock jsons
		jasmine.getJSONFixtures().fixturesPath='base/js/tests/api_mock';

		scope = $injector.get('$rootScope');
		
		var $controller = $injector.get('$controller');
		createController = function() {
       		return $controller('productsController', {'$scope' : scope, '$stateParams' : { id: 10 } });
     	};

		$httpBackend.when('GET', api_root + 'taxonomies').respond(
			getJSONFixture('taxonomies.json')
		);

		$httpBackend.when('GET', api_root + 'products/10').respond(
			getJSONFixture('10.json')
		);

		var controller = createController();

		$httpBackend.flush();
	}));
	
	afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    	$httpBackend.resetExpectations();
   	});

	it('Should instantiate a new product object from json data', function() {
		expect(scope.currentProduct.name).toBe('Spree Ringer T-Shirt');
	});
}); 

describe('taxonomiesController', function() {
	var scope, $httpBackend, createController;
	var api_root = 'http://0.0.0.0:3000/api/';

	beforeEach(angular.mock.module('sprangularApp'));
	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');

		//Get mock jsons
		jasmine.getJSONFixtures().fixturesPath='base/js/tests/api_mock';

		scope = $injector.get('$rootScope');
	}));

	afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    	$httpBackend.resetExpectations();
   	});

	describe('taxonomiesController viewing a taxonomy', function() {
		beforeEach(inject(function($injector) {
			var $controller = $injector.get('$controller');

			createController = function() {
	       		return $controller('taxonomiesController', {'$scope' : scope, '$stateParams' : {taxonomy: 'categories'} });
	     	};

			var controller = createController();

			$httpBackend.when('GET', api_root + 'taxonomies').respond(
				getJSONFixture('taxonomies.json')
			);

			$httpBackend.flush();
		}));

		it('should set the title as the taxonomy name', function() {
			expect(scope.title).toBe('Categories');
		});

		it('should list the taxons under that taxonomy', function() {
			expect(scope.taxons[0].name).toBe('Bags')
		});

	});

	describe('taxonomiesController viewing a taxon', function() {
		beforeEach(inject(function($injector) {
			var $controller = $injector.get('$controller');

			createController = function() {
	       		return $controller('taxonomiesController', {'$scope' : scope, '$stateParams' : {taxonomy: 'categories', taxon: 'bags'} });
	     	};

			var controller = createController();

			$httpBackend.when('GET', api_root + 'taxonomies').respond(
				getJSONFixture('taxonomies.json')
			);

			$httpBackend.when('GET', api_root + 'products?q[classifications_taxon_id_in]=3').respond(
				getJSONFixture('products_search_by_taxon.json')
			);

			$httpBackend.flush();
		}));

		// it('should set the title as the taxon name', function() {
		// 	expect(scope.title).toBe('Bags');
		// });

		// it('should list the products under that taxon', function() {
		// 	expect(scope.products[0].name).toBe('Ruby on Rails Tote');
		// });

	});
});