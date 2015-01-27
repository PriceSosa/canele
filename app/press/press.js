'use strict';

var pressApp = angular.module('canele.press', ['ngRoute']);

pressApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/press', {
		templateUrl: 'press/press.html',
		controller: 'PressCtrl'
	});
}])

var pressCtrl = pressApp.controller('PressCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])