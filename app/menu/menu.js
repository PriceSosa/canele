'use strict';

var menuApp = angular.module('canele.menu', ['ngRoute']);

menuApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/menu', {
		templateUrl: 'menu/menu.html',
		controller: 'MenuCtrl',
		resolve: {
			loadMenus: menuCtrl.loadMenus,
			loadCategories: menuCtrl.loadCategories,
			loadFoods: menuCtrl.loadFoods
		}
	});
}])

var menuCtrl = menuApp.controller('MenuCtrl', ['$scope', 'MenuService', function($scope, MenuService) {
	$scope.model = {};

// console.log('loading into ctrl')
	$scope.model.menus = MenuService.getMenus();
	$scope.model.categories = MenuService.getCategories();
	$scope.model.foods = MenuService.getFoods();

	$scope.model.showMenu = false;
	$scope.model.menu = $scope.model.menus[0];

	// $scope.model.newMenus = MenuService.getNewMenus();

	$scope.toggleShowMenu = function() {
		$scope.model.showMenu = !$scope.model.showMenu;
	};
	$scope.setMenu = function(menu) {
		$scope.model.menu = menu;
		$scope.model.showMenu = false;
	};
	$scope.showMenus = function(menu) {
		// $scope.model.menu = menu;
		$scope.model.showMenu = true;
		console.log($scope.model.showMenu);
	};

}])

menuCtrl.loadMenus = function(MenuService) {
	return MenuService.menusReady();
}

menuCtrl.loadCategories = function(MenuService) {
	return MenuService.menuCategoriesReady();
}

menuCtrl.loadFoods = function(MenuService) {
	return MenuService.menuItemsReady();
}

menuCtrl.loadServices = function(MenuService) {
	return MenuService.menuItemsReady();
}