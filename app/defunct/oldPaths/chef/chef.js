'use strict';

var chefApp = angular.module('canele.chef', ['ngRoute']);

chefApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/chef', {
		templateUrl: 'chef/chef.html',
		controller: 'ChefCtrl'
	});
}])

var chefCtrl = chefApp.controller('ChefCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])