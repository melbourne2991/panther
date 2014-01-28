pantherServices = angular.module('pantherServices', ['ngResource'])

pantherServices.service('Defaults', -> 
	root = 'http://0.0.0.0:3000/#';
	store_root = root + '';
	return {
		api_url: "http://0.0.0.0:3000/api/",
		root: root,
		store_root:    store_root,
		store_path:    store_root + '/'
		products_path: store_root + '/products/'		
	}
)

pantherServices.factory('Cart', ->
	class Cart
		this.addToCart = (item, quantity) ->
			console.log('added')

			item_already_in_cart = false

			angular.forEach(this.currentItems, (current_item,index) ->
				if item.id == current_item.id
					item_already_in_cart = index
			)

			if item_already_in_cart	!= false
				this.currentItems[item_already_in_cart].quantity = this.currentItems[item_already_in_cart].quantity + quantity
			else
				item.quantity = quantity
				this.currentItems.push(item)
			

		this.currentItems = []	
)

pantherServices.factory('Product', ($resource, Defaults) -> 
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

pantherServices.factory('Taxonomy', ($resource, $http, Defaults) -> 

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

pantherServices.factory('Taxon', ($resource, $http, Defaults) -> 
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