'use strict';

var locationApp = angular.module('canele.location', ['ngRoute']);

locationApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/location', {
		templateUrl: 'location/location.html',
		controller: 'LocationCtrl'
	});
}])

var locationCtrl = locationApp.controller('LocationCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])