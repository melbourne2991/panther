(function() {

	var pantherServices = angular.module('pantherServices', ['ngResource']);

	pantherServices.service('Defaults', function() {
		var root = 'http://0.0.0.0:3000/#';
		var store_root = root + '';
		var admin_root = root + '/admin'

		return {
			api_url: "http://0.0.0.0:3000/api/",
			root: root,

			store_root: store_root,
			store_path: store_root + '/',

			admin_root: admin_root,
			admin_path: admin_root + '/',

			products_path: store_root + '/products/'
		};
	});

	pantherServices.factory('Cart', function() {
		var Cart;

		return Cart = (function() {
			function Cart() {}

			Cart.addToCart = function(item, quantity) {

				var item_already_in_cart = false;

				angular.forEach(this.currentItems, function(current_item, index) {

					if (item.id === current_item.id) {

						item_already_in_cart = index;

					}
					
				});

				if (item_already_in_cart !== false) {

					this.currentItems[item_already_in_cart].quantity = this.currentItems[item_already_in_cart].quantity + quantity;

				} else {

					item.quantity = quantity;

					this.currentItems.push(item);

				}
			};

			Cart.currentItems = [];

			return Cart;

		})();
	});

	pantherServices.factory('Product', function($resource, Defaults) {
		var Product = $resource(Defaults.api_url + 'products', {productId: '@productId'} , {
				find: {
					method: 'GET',
					url: Defaults.api_url + 'products/:productId',
				},
				all: {
					method: 'GET',
					isArray: true
				}
			});
		
		return Product
	});

	pantherServices.factory('Taxonomy', function($resource, $http, Defaults) {

		var Taxonomy;

		return Taxonomy = (function() {

			function Taxonomy() {

				this.service = $resource(Defaults.api_url + 'taxonomies/:id', {
					id: '@id'
				});

			}

			Taxonomy.taxonomies_with_meta = function() {

				var service;
				service = $resource(Defaults.api_url + 'taxonomies');
				return service.get();

			};

			Taxonomy.find = function(id) {

				var service;

				if (id.length > 1) {
					service = $resource(Defaults.api_url + 'taxonomies/' + id[0] + '/taxons/' + id[1]);
				} else {
					service = $resource(Defaults.api_url + 'taxonomies/' + id[0]);
				}

				return service.get();

			};

			Taxonomy.findByPermalink = function(permalink) {

				return this.taxonomies_with_meta().$promise.then(function(response) {

					var current_taxonomy = null;

					angular.forEach(response.taxonomies, function(taxonomy) {

						taxonomy = taxonomy.root;

						if (taxonomy.permalink === permalink) {

							current_taxonomy = taxonomy;

						}
					});

					return current_taxonomy;

				});
			};

			return Taxonomy;

		})();
	});

	pantherServices.factory('Taxon', function($resource, $http, Defaults) {
		var Taxon;
		return Taxon = (function() {

			function Taxon() {

				this.service = $resource(Defaults.api_url + 'taxons/:id', {

					id: '@id'

				});

			}

			Taxon.taxons_with_meta = function() {

				var service = $resource(Defaults.api_url + 'taxons');

				return service.get();

			};

			Taxon.findByPermalink = function(permalink) {

				return this.taxons_with_meta().$promise.then(function(response) {

					var current_taxon = null;

					angular.forEach(response.taxons, function(taxon) {

						if (taxon.permalink === permalink) {

							return current_taxon = taxon;

						}

					});

					return current_taxon;

				});

			};

			Taxon.listProducts = function(taxon_id) {

				var service = $resource(Defaults.api_url + 'products?q[classifications_taxon_id_in]=' + taxon_id);

				return service.get();

			};

			return Taxon;

		})();
	});

}).call(this);
