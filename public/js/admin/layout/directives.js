var adminLayoutDirectives = angular.module('adminLayoutDirectives', ['pantherServices', 'ui.router']);

adminLayoutDirectives.directive('sidebar', function() {
	return {
		controller: function() {
			
		},
		link: function(scope, element, attrs) {
			var list_items = angular.element('ul li', element);
			var list_items_height = list_items.height();
				list_items_height = list_items_height + parseInt(list_items.css('padding'));

			list_items.append('<div class="pusher"></div>')
		}
	}
});