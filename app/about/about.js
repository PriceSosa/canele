'use strict';

var aboutApp = angular.module('canele.about', ['ngRoute']);

aboutApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/about', {
		templateUrl: 'about/about.html',
		controller: 'AboutCtrl'
	});
}])

var aboutCtrl = aboutApp.controller('AboutCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
	$scope.model = {};

	$scope.model.items = [
		{'denomination': 25, 'textValue': '$25 gift certificate'},
		{'denomination': 50, 'textValue': '$50 gift certificate'},
		{'denomination': 75, 'textValue': '$75 gift certificate'},
		{'denomination': 100, 'textValue': '$100 gift certificate'},
		{'denomination': 125, 'textValue': '$125 gift certificate'},
		{'denomination': 150, 'textValue': '$150 gift certificate'}
	];

	$scope.model.selectedItem = $scope.model.items[0];
    
	$scope.goToDiretions = function() {
		$location.hash('directions');
		$anchorScroll();
	};

    $scope.gimme = function() {
        $scope.model.item_name = $scope.model.selectedItem.textValue;
        $scope.model.amount = $scope.model.selectedItem.denomination;
    }
}])