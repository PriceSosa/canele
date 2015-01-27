'use strict';

// Declare app level module which depends on views, and components
angular.module('canele', [
  'ngRoute',
  'ngDraggable',
	// 'ui.bootstrap',
  'canele.home',
  'canele.menu',
  'canele.about',
  'canele.press',
  'canele.friends',
  'canele.catering',
  // 'canele.location',
  // 'canele.gift',
  // 'canele.chef',
  // 'canele.contact',
  // 'canele.news',
  // 'canele.admin',
  // 'canele.version',
  
  'services.menu',
  'services.api',

	'directives.display',
  'directives.pictures',
  'directives.utility'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.controller('CaneleCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.model = {};
	$scope.model.showMenu = false;

	$scope.toggleShowMenu = function() {
		$scope.model.showMenu = !$scope.model.showMenu;
	}

  $scope.adminPage = function() {
    return ($location.path().indexOf('/admin') > -1);
  }

  $scope.goToPath = function(path) {
    console.log(path);
    $scope.toggleShowMenu();
    $location.path(path);
  }

  $scope.getClass = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
  }  
}]);