angular.module('services.menu', [])

    .factory('MenuService', ['$q', '$http', 'APIService', function($q, $http, api) { 
        var model = {};
        // model.item = {};
        // model.menu = {};
        // model.category = {};

        model.menus = [];
        model.categories = [];
        model.foods = [];

        var menusReady = $q.defer();
        var categoriesReady = $q.defer();
        var foodsReady = $q.defer();
        var allReady = $q.all([menusReady.promise, categoriesReady.promise, foodsReady.promise]);

        model.newMenus = [];
        model.newCategories = [];
        model.newFoods = [];

        // api.getSPStuff().then(function(result) {
        //     console.log(result);
        //     model.stuff = result;
        // });

        // api.getMenus().then(function(result) {
        //     model.menus = result.data;
        //     menusReady.resolve();
        // });
        // api.getMenuCategories().then(function(result) {
        //     model.categories = result.data;
        //     categoriesReady.resolve();
        // });
        // api.getMenuItems().then(function(result) {
        //     populateFoods(result.data);
        //     // model.foods = result.data;
        //     foodsReady.resolve();
        // });

        api.getNewMenus().then(function(result) {
            // console.log(result.data.data.menus);

            for (var i = 0; i < result.data.data.menus.length; i++) {

                model.menus.push({
                    'MENU':result.data.data.menus[i].name, 
                    'ACTIVE':1, 
                    'MENUID':result.data.data.menus[i].id
                });

                for (var j = 0; j < result.data.data.menus[i].sections.length; j++) {
                    // console.log(result.data.data.menus[i].sections[j]);
                    model.categories.push({
                        'MENUCATEGORY':result.data.data.menus[i].sections[j].name, 
                        'MENUID':result.data.data.menus[i].id, 'ACTIVE':1, 
                        'MENUCATEGORYID':result.data.data.menus[i].sections[j].id
                    });

                    for (var k = 0; k < result.data.data.menus[i].sections[j].items.length; k++) {
                        var choices = result.data.data.menus[i].sections[j].items[k].choices;
                        model.foods.push({
                            'MENUITEM':result.data.data.menus[i].sections[j].items[k].name,
                            'MENUITEMID':result.data.data.menus[i].sections[j].items[k].id,
                            'DESCRIPTION':result.data.data.menus[i].sections[j].items[k].description,
                            'MENUID':result.data.data.menus[i].id, 
                            'MENU':result.data.data.menus[i].name, 
                            'MENUCATEGORYID':result.data.data.menus[i].sections[j].id,
                            'MENUCATEGORY':result.data.data.menus[i].sections[j].name, 
                            // 'PRICE':choices[0],
                            'PRICE':result.data.data.menus[i].sections[j].items[k].choices[0],
                            'ACTIVE':1
                        });
                    };
                };
                menusReady.resolve();
                categoriesReady.resolve();
                foodsReady.resolve();
            };

            // console.log(model.menus);
            // console.log(model.categories);
            // console.log(model.foods);
            // model.newMenus = result;
        })

        function populateFoods(items) {
            while(model.foods.length > 0) {model.foods.pop()}

            for (var i = 0; i < items.length; i++) {
                model.foods.push(items[i]);
            }
        }

        return {
            menusReady: function() {
                return menusReady.promise;
            },
            menuCategoriesReady: function() {
                return categoriesReady.promise;                
            },
            menuItemsReady: function() {
                return foodsReady.promise;                
            },
            menuItemsReady: function() {
                return allReady.promise;
            },
            getMenus: function() {
                return model.menus;
            },
            getCategories: function() {
                return model.categories;
            },
            getFoods: function() {
                return model.foods;
            },
            reloadMenuItems: function() {
                menusReady = $q.defer();
                api.getMenuItems().then(function(result) {
                    // console.log('repopulate');
                    // console.log(result);
                    populateFoods(result.data);
                    menusReady.resolve();
                });
            },
            // updateMenuItem: function(item, menuID, categoryID) {
            updateMenuItem: function(item) {
                menusReady = $q.defer();
                // api.updateMenuItem(item, menuID, categoryID).then(function(result) {
                api.updateMenuItem(item).then(function(result) {
                    menusReady.resolve();
                });
            },


            getNewMenus: function() {
            }
        }
    }]);
