// Generated by CoffeeScript 1.6.1
(function() {
  var sprangularDirectives;

  sprangularDirectives = angular.module('sprangularDirectives', []);

  sprangularDirectives.directive('productImageGallery', function() {
    return {
      scope: {
        images: '='
      },
      templateUrl: 'partials/product/_product.html',
      controller: function($scope) {
        return $scope.$watch('images', function(newVal) {
          var i, image_positions, _i, _len;
          if (newVal) {
            image_positions = new Array();
            angular.forEach($scope.images, function(image) {
              return image_positions[image.position] = {
                mini: image.mini_url,
                small: image.small_url,
                medium: image.product_url,
                large: image.large_url
              };
            });
            $scope.sorted_images = new Array();
            for (_i = 0, _len = image_positions.length; _i < _len; _i++) {
              i = image_positions[_i];
              if (i) {
                $scope.sorted_images.push(i);
              }
            }
            $scope.currentImage = 0;
            $scope.updateCurrentImage = function() {
              if ($scope.currentImage >= ($scope.sorted_images.length - 1)) {
                console.log($scope.currentImage);
                return $scope.currentImage = 0;
              } else {
                console.log($scope.currentImage);
                return $scope.currentImage++;
              }
            };
            return $scope.showClickedImage = function(image_number) {
              return $scope.currentImage = image_number;
            };
          }
        }, true);
      },
      link: function(scope, el, attrs) {}
    };
  });

}).call(this);
