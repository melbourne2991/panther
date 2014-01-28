// Generated by CoffeeScript 1.6.1
(function() {
  var pantherControllers;

  pantherControllers = angular.module('pantherControllers', ['pantherServices', 'ngRoute', 'ui.router']);

  pantherControllers.controller('productsController', [
    '$scope', '$state', '$stateParams', 'Product', 'Cart', 'Taxonomy', 'Defaults', function($scope, $state, $stateParams, Product, Cart, Taxonomy, Defaults) {
      $scope.root = Defaults.root;
      Product.find($stateParams.id).$promise.then(function(response) {
        return angular.forEach(response.variants, function(variant) {
          if (variant.is_master) {
            return $scope.product = variant;
          }
        });
      });
      return $scope.addToCart = function(item, quantity) {
        if (quantity > 0) {
          quantity;
        } else {
          quantity = 1;
        }
        Cart.addToCart(item, quantity);
        return console.log(Cart.currentItems);
      };
    }
  ]);

  pantherControllers.controller('taxonomiesController', [
    '$scope', '$state', '$stateParams', 'Taxonomy', 'Defaults', function($scope, $state, $stateParams, Taxonomy, Defaults) {
      var permalink;
      $scope.root = Defaults.root;
      permalink = $stateParams.taxonomy;
      return Taxonomy.findByPermalink(permalink).then(function(response) {
        var taxonomy;
        taxonomy = response;
        $scope.title = taxonomy.name;
        return $scope.taxons = taxonomy.taxons;
      });
    }
  ]);

  pantherControllers.controller('taxonsController', [
    '$scope', '$state', '$stateParams', 'Taxon', 'Defaults', function($scope, $state, $stateParams, Taxon, Defaults) {
      var permalink;
      $scope.root = Defaults.root;
      $scope.products_path = Defaults.products_path;
      permalink = $stateParams.taxonomy + '/' + $stateParams.taxon;
      return Taxon.findByPermalink(permalink).then(function(response) {
        var taxon;
        taxon = response;
        $scope.title = taxon.name;
        return Taxon.listProducts(taxon.id).$promise.then(function(response) {
          return $scope.products = response.products;
        });
      });
    }
  ]);

}).call(this);
