'use strict';

var newsApp = angular.module('canele.news', ['ngRoute']);

newsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/news', {
		templateUrl: 'news/news.html',
		controller: 'NewsCtrl'
	});
}])

var newsCtrl = newsApp.controller('NewsCtrl', ['$scope', function($scope) {
	$scope.model = {};
}])