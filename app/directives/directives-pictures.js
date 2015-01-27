angular.module('directives.pictures', [])

    .directive('clPicSix', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                image: '@'
            },
            template: '<div class="col-md-6"><img src={{image}} alt="..." style="border: 2px solid black; width: 100%;"></div>'
        };
    })