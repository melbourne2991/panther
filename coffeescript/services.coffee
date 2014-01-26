sprangularServices = angular.module('sprangularServices', ['ngResource'])

sprangularServices.service('Defaults', -> 
	root = 'http://0.0.0.0:3000/#';
	store_root = root + '/store';
	return {
		api_url: "http://0.0.0.0:3000/api/",
		root: root,
		store_root:    store_root,
		store_path:    store_root + '/'
		products_path: store_root + '/products/'		
	}

)

sprangularServices.factory('Product', ($resource, Defaults) -> 
	class Product
		constructor: ->
			@service = $resource(Defaults.api_url + 'products/:id',	{id: '@id'})

		this.products_with_meta = ->
			service = $resource(Defaults.api_url + 'products')
			service.get()

		this.find = (id) -> 
			service = $resource(Defaults.api_url + 'products/:id', {id: id})
			service.get()
)

sprangularServices.factory('Taxonomy', ($resource, $http, Defaults) -> 

	class Taxonomy
		constructor: ->
			@service = $resource(Defaults.api_url + 'taxonomies/:id',	{id: '@id'})

		this.taxonomies_with_meta = ->
			service = $resource(Defaults.api_url + 'taxonomies')
			service.get()

		this.find = (id) -> 
			if id.length > 1
				service = $resource(Defaults.api_url + 'taxonomies/' + id[0] + '/taxons/' + id[1])
			else
				service = $resource(Defaults.api_url + 'taxonomies/' + id[0])
			service.get()

		this.findByPermalink = (permalink) ->
			this.taxonomies_with_meta().$promise.then( (response) ->
				current_taxonomy = null

				angular.forEach(response.taxonomies, (taxonomy) ->
					taxonomy = taxonomy.root
					current_taxonomy = taxonomy if taxonomy.permalink == permalink
				)

				return current_taxonomy
			)
)

sprangularServices.factory('Taxon', ($resource, $http, Defaults) -> 

	class Taxon
		constructor: ->
			@service = $resource(Defaults.api_url + 'taxons/:id',	{id: '@id'})

		this.taxons_with_meta = ->
			service = $resource(Defaults.api_url + 'taxons')
			service.get()

		this.findByPermalink = (permalink) ->
			this.taxons_with_meta().$promise.then( (response) ->
				current_taxon = null

				console.log(response)
				console.log(permalink)

				angular.forEach(response.taxons, (taxon) ->
					current_taxon = taxon if taxon.permalink == permalink
				)

				return current_taxon
			)

		this.listProducts = (taxon_id) ->
			service = $resource(Defaults.api_url + 'products?q[classifications_taxon_id_in]=' + taxon_id)
			service.get()
)