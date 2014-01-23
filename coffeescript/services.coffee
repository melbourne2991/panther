sprangularServices = angular.module('sprangularServices', ['ngResource'])

sprangularServices.service('Defaults', -> 
	root: 'http://0.0.0.0:3000/#',
	api_url: "http://0.0.0.0:3000/api/"
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
				current_taxon = null

				angular.forEach(response.taxonomies, (taxonomy) ->
					taxonomy = taxonomy.root
					current_taxonomy = taxonomy if taxonomy.permalink == permalink[0]

					if permalink[1]
						angular.forEach(taxonomy.taxons, (taxon) ->
							current_taxon = taxon if taxon.permalink == permalink[0] + '/' + permalink[1]
						)
				)

				return [current_taxonomy, current_taxon]
			)

		this.listProducts = (taxon_id) ->
			service = $resource(Defaults.api_url + 'products?q[classifications_taxon_id_in]=' + taxon_id)
			service.get()
)