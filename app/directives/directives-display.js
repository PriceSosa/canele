angular.module('directives.display', [])

    .directive('clNews', function() {
        return {
            restrict: 'A',
            replace: false,
            scope: {
            },
            templateUrl: "partials/sidebar/news.html"
        };
    })

    .directive('clTakeout', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
            },
            templateUrl: "partials/sidebar/takeout.html"
        };
    })

    .directive('clCatering', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
            },
            templateUrl: "partials/sidebar/catering.html"
        };
    })

    .directive('clHours', function() {
        return {
            restrict: 'A',
            replace: false,
            scope: {
            },
            templateUrl: "partials/sidebar/hours.html"
        };
    })

    .directive('clReservations', function() {
        return {
            restrict: 'A',
            replace: false,
            scope: {
            },
            templateUrl: "partials/sidebar/reservations.html"
        };
    })    

    .directive('clPictures', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
            },
            templateUrl: "partials/pictures.html"
        };
    })

    .directive('clPressSmall', function() {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
            },
            templateUrl: "partials/pressSmall.html"
        };
    })

    .directive('clPressMd', function() {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
            },
            templateUrl: "partials/md/press.html",
        };
    })    

    .directive('clPressXs', function() {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
            },
            templateUrl: "partials/xs/press.html",
        };
    })    

// .directive('clSamplesSidebar', function() {
//     return {
//         restrict: 'A',
//         replace: true,
//         transclude: true,
//         scope: {
//         },
//         templateUrl: "partials/sidebar/samples.html"
//     };
// })    