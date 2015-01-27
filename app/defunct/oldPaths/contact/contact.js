'use strict';

var contactApp = angular.module('canele.contact', ['ngRoute']);

contactApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contact', {
		templateUrl: 'contact/contact.html',
		controller: 'ContactCtrl'
	});
}])

var contactCtrl = contactApp.controller('ContactCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])