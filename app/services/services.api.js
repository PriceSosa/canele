angular.module('services.api', [])

    .factory('APIService', ['$http', function($http) { 

        return {
            // getSPStuff: function() {
            //     return $http({
            //         method: "get",
            //         url: "http://menus.singleplatform.co/locations/canel-1/menu?apiKey=ke09z8icq4xu8uiiccighy1bw",
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded'
            //         },
            //         cache: true
            //     })
            // },

            getMenus: function() {
                return $http({
                    method: "get",
                    url: "backend/index.cfm/api/getMenus",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cache: true
                })
            },

            getMenuCategories: function() {
                return $http({
                    method: "get",
                    url: "backend/index.cfm/api/getMenuCategories",
                    // url: "model/services/api.cfc?method=getMenuCategories",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cache: true
                })
            },

            getMenuItems: function() {
                return $http({
                    method: "get",
                    url: "backend/index.cfm/api/getMenuItems",
                    // url: "model/services/api.cfc?method=getMenuItem",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    // cache: true
                })
            },

            // updateMenuItem: function(item, menuID, categoryID) {
            updateMenuItem: function(item) {
                return $http({
                    method: "post",
                    url: "model/services/api.cfc?method=updateMenuItem",
                    data: $.param({
                        menuItemID: item.MENUITEMID,
                        menuCategoryID: item.MENUCATEGORYID,
                        menuItem: item.MENUITEM,
                        description: item.DESCRIPTION,
                        price: item.PRICE,
                        sortID: item.SORTID,
                        active: item.ACTIVE
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    // cache: true
                })
            	
            	return item;
            	
                // return $http({
                //     method: "post",
                //     url: "cfc/model/services/_APIService.cfc?method=getCurrentPrivileges",
                //     data: $.param({
                //         // noteTypeID: noteTypeID
                //     }),
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     },
                //     cache: true
                // })
            },


            getNewMenus: function() {

                // var hmac = encodeURIComponent(CryptoJS.HmacSHA1('/locations/canel/all/?client=c3sbrpbtkbs5gverurfkxpemc', 'PkkJXNRpO2l0r5u6u0PlCNme1KA8akGejMIjHI5Gkj8'));
                // var hmac = encodeURIComponent(CryptoJS.HmacSHA1('/locations/canel/all/?client=c3sbrpbtkbs5gverurfkxpemc', atob('PkkJXNRpO2l0r5u6u0PlCNme1KA8akGejMIjHI5Gkj8')));
                var hmac = encodeURIComponent(btoa(CryptoJS.HmacSHA1('/locations/canel/all/?client=c3sbrpbtkbs5gverurfkxpemc', 'PkkJXNRpO2l0r5u6u0PlCNme1KA8akGejMIjHI5Gkj8')));
                // var hmac = encodeURIComponent(btoa(CryptoJS.HmacSHA1('/locations/canel/all/?client=c3sbrpbtkbs5gverurfkxpemc', atob('PkkJXNRpO2l0r5u6u0PlCNme1KA8akGejMIjHI5Gkj8'))));

                return $http({
                    method: "get",
                    // url: 'http://publishing-api.singleplatform.com/locations/canel?client=c3sbrpbtkbs5gverurfkxpemc&signature=' + hmac,
                    url: 'http://publishing-api.singleplatform.com/locations/canel/all/?client=c3sbrpbtkbs5gverurfkxpemc&signature=2MTpwTz1MCTKLYTkc%2F4QJrQs75Y%3D',
                    headers: {
                        // "Accept":"application/json",
                        // 'Access-Control-Allow-Origin': '*',
                        // "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
                        // "Access-Control-Allow-Methods": "GET, PUT, POST",
                        'Content-Type': 'application/json'
                    }
                })
            },            
        }

    }]);
