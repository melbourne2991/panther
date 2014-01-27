'use strict';

describe('productDirective', function() {

	var api_root = 'http://0.0.0.0:3000/api/';
	var scope, el, directive, $httpBackend, compiler, compiled, html;

	beforeEach(module('partials/product/_product.html'));
	beforeEach(angular.mock.module('pantherApp'));

	beforeEach(function() {

		html = '<div data-product-directive product="currentProduct"></div>';

		inject(function($injector) {
			$httpBackend = $injector.get('$httpBackend');

			$httpBackend.when('GET', api_root + 'taxonomies').respond(
				getJSONFixture('taxonomies.json')
			);

			scope = $injector.get('$rootScope');
			scope.currentProduct = {name: 'testing', 
				variants: [{

					'is_master': 'true',

						images: [

							{product_url:'/spree/products/38/product/first_image.jpg', position: 1 },
							{product_url:'/spree/products/39/product/second_image.jpg', position: 2},
							{product_url:'/spree/products/39/product/last_image.jpg', position: 6}
						]
				}]
			};

			el = angular.element(html);

			compiler = $injector.get('$compile');
			compiled = compiler(el);
			compiled(scope);

			scope.$digest();
		});

	});

	it('Should have an isolate scope', function() {		
		expect(el.isolateScope().product.name).toBe('testing');
	});

	it('Should have sorted images in the isolate scope', function() {
		expect(el.isolateScope().sorted_images[0].medium).toBe('/spree/products/38/product/first_image.jpg');
		expect(el.isolateScope().sorted_images[1].medium).toBe('/spree/products/39/product/second_image.jpg');
		expect(el.isolateScope().sorted_images[2].medium).toBe('/spree/products/39/product/last_image.jpg');
	});

});