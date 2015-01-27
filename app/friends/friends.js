'use strict';

var friendsApp = angular.module('canele.friends', ['ngRoute']);

friendsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/friends', {
		templateUrl: 'friends/friends.html',
		controller: 'FriendsCtrl'
	});
}])

var friendsCtrl = friendsApp.controller('FriendsCtrl', ['$scope', function($scope) {
	$scope.model = {};

	$scope.friendsPics = ['friends1','friends2','friends3','friends4','friends5','friends6']
}])