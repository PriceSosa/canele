'use strict';

var giftApp = angular.module('canele.gift', ['ngRoute']);

giftApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/gift', {
		templateUrl: 'gift/gift.html',
		controller: 'GiftCtrl'
	});
}])

var giftCtrl = giftApp.controller('GiftCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])