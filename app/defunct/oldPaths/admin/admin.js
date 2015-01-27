'use strict';


var adminApp = angular.module('canele.admin', ['ngRoute'])

adminApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/admin', {
			templateUrl: 'admin/admin.html',
			// controller: 'AdminCtrl',
			controller: 'MenuSearchController',
			resolve: {
				loadMenus: menuCtrl.loadMenus,
				loadCategories: menuCtrl.loadCategories,
				loadFoods: menuCtrl.loadFoods
				// loadServices: menuCtrl.loadServices
			}
		})
		.when('/admin/order', {
			templateUrl: 'admin/order.html',
			controller: 'FoodOrderCtrl',
			resolve: {
				loadMenus: orderCtrl.loadMenus,
				loadCategories: orderCtrl.loadCategories,
				loadFoods: orderCtrl.loadFoods
				// loadServices: menuCtrl.loadServices
			}
		});
}])


// var adminCtrl = adminApp.controller('AdminCtrl', ['$scope', '$http', function($scope, $http) {
// }])

var orderCtrl = adminApp.controller('FoodOrderCtrl', ['$scope', '$http', 'MenuService', function($scope, $http, MenuService) {
    $scope.model = {};
    $scope.search = {};
	$scope.search.filteredCategories = [];

    $scope.alerts = {};
    $scope.alerts.success = false;

	$scope.search.menus = MenuService.getMenus();
	$scope.search.menu = $scope.search.menus[0].MENUID;
	$scope.search.categories = MenuService.getCategories();
	$scope.model.foods = MenuService.getFoods();

    //cascading filters
    $scope.$watch(
        'search.filteredCategories',
        function(){
        	// console.log($scope.search.filteredCategories);
            if ($scope.search.filteredCategories != undefined && $scope.search.filteredCategories.length > 0) {
                $scope.search.category = $scope.search.filteredCategories[0].MENUCATEGORYID;
            }
        }, true);

	// Draggables...
	$scope.onDropComplete = function (index, obj, evt) {
		var otherObj = $scope.model.foods[index];
		var otherIndex = $scope.model.foods.indexOf(obj);
		$scope.model.foods[index] = obj;
		$scope.model.foods[otherIndex] = otherObj;
	}

	$scope.updateOrder = function() {
		for (var i = 0; i < $scope.model.filteredFoods.length; i++) {
			$scope.model.filteredFoods[i].SORTID = (i+1);
			MenuService.updateMenuItem($scope.model.filteredFoods[i]);
			// MenuService.updateMenuItem($scope.model.filteredFoods[i], $scope.model.filteredFoods[i].MENUID, $scope.model.filteredFoods[i].MENUCATEGORYID);
			MenuService.menusReady().then(function(result) { });
		};
		MenuService.reloadMenuItems();
	    $scope.alerts.success = true;
		// $scope.cancel();
	}

	$scope.hideSuccess = function () {
	    $scope.alerts.success = false;
	}

}]);

orderCtrl.loadMenus = function(MenuService) {
	return MenuService.menusReady();
}

orderCtrl.loadCategories = function(MenuService) {
	return MenuService.menuCategoriesReady();
}

orderCtrl.loadFoods = function(MenuService) {
	return MenuService.menuItemsReady();
}

var menuSearchCtrl = adminApp.controller('MenuSearchController', ['$scope', '$http', '$filter', 'MenuService', function($scope, $http, $filter, MenuService) {

	$scope.search = {};
	$scope.edit = {};
	$scope.edit.item = {};

	$scope.search.predicate = "PRICE";
	$scope.search.reverse = true;
	$scope.edit.editing = true;

	$scope.search.menus = MenuService.getMenus();
	$scope.edit.menu = $scope.search.menus[0];
	$scope.search.categories = MenuService.getCategories();
	$scope.search.foods = MenuService.getFoods();

	// $http.get('mockdb/menu.json').success(function(data) {
	// 	$scope.search.menus = data;
	// 	$scope.edit.menu = $scope.search.menus[0];
	// 	console.log(data[0]);
	// });
	// $http.get('mockdb/category.json').success(function(data) {
	// 	$scope.search.categories = data;
	// });
	// $http.get('mockdb/food.json').success(function(data) {
	// 	$scope.search.foods = data;
	// });

	// $scope.search.actives = [{'active': 'y', 'value': 1}, {'active':'n', 'value': 0}]

    // $scope.$watch(
    //     'edit.item.PRICE',
    //     function(){
    //     	edit.item.PRICE = $filter('currency')(edit.item.PRICE);
    //     }, true);


	$scope.edit = function(food) {
		$scope.edit.editing = true;
		$scope.edit.item = angular.copy(food);

		$scope.edit.item.menu = food.MENUID;
		$scope.edit.item.category = food.MENUCATEGORYID;
		$scope.edit.item.active = food.ACTIVE;
	}

	$scope.create = function() {
		$scope.edit.editing = true;
		$scope.edit.item = {'MENUITEMID':0, 'ACTIVE':1, 'SORTID':0};
		$scope.edit.item.active = 1;
	}

	$scope.update = function() {
		var itemCopy = angular.copy($scope.edit.item);
		itemCopy.ACTIVE = $scope.edit.item.active;
		itemCopy.MENUID = $scope.edit.item.menu;
		itemCopy.MENUCATEGORYID = $scope.edit.item.category;
		
		// MenuService.updateMenuItem(itemCopy, $scope.edit.item.menu, $scope.edit.item.category);
		MenuService.updateMenuItem(itemCopy);
		MenuService.menusReady().then(function(result) {		
			MenuService.reloadMenuItems();
			$scope.cancel();
		});
	}

	// $scope.delete = function() {
	// 	$scope.edit.item.ACTIVE = 0;
	// 	MenuService.updateMenuItem($scope.edit.item, $scope.edit.item.menu, $scope.edit.item.category);
	// }

	$scope.cancel = function(){
		$scope.edit.editing = false;
		$scope.edit.item = {};
	}

	$scope.toggle = function(column) {
		if (column === $scope.search.predicate) {
			$scope.search.reverse = !$scope.search.reverse;
		} else {
			$scope.search.predicate = column;
		}
	}
}]);

menuSearchCtrl.loadMenus = function(MenuService) {
	return MenuService.menusReady();
}

menuSearchCtrl.loadCategories = function(MenuService) {
	return MenuService.menuCategoriesReady();
}

menuSearchCtrl.loadFoods = function(MenuService) {
	return MenuService.menuItemsReady();
}

