'use strict';

var cateringApp = angular.module('canele.catering', ['ngRoute']);

cateringApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/catering', {
		templateUrl: 'catering/catering.html',
		controller: 'CateringCtrl'
	});
}])

var cateringCtrl = cateringApp.controller('CateringCtrl', ['$scope', function($scope) {
	$scope.model = {};

	$scope.model.samples = [];
	$scope.model.samples.push({title: 'Fundraiser For 500', mdpath: 'partials/fundraiser.html'});
	$scope.model.samples.push({title: 'Shower For 30', mdpath: 'partials/shower.html'});
	$scope.model.samples.push({title: 'Summer Wedding For 150', mdpath: 'partials/summer.html'});
	$scope.model.samples.push({title: 'Box Lunch For 33', mdpath: 'partials/summer.html'});
	$scope.model.samples.push({title: 'Reception For 35', mdpath: 'partials/reception.html'});
	$scope.model.samples.push({title: 'Wedding For 50', mdpath: 'partials/wedding.html'});

	$scope.model.selectedSample = $scope.model.samples[0];
	console.log($scope.model.samples);

}])