'use strict';

var homeApp = angular.module('canele.home', ['ngRoute']);

homeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl',
		resolve: {
			loadServices: homeCtrl.loadServices
		}
	});
}])

var homeCtrl = homeApp.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])

homeCtrl.loadServices = function(MenuService) {
	// return MenuService.menuItemsReady();
}