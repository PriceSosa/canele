angular.module('directives.utility', [])

    .directive('sortChevron', function() {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                predicate: '=',
                value: '@',
                order: '='
            },
            template: 
                '<span>'
                    + '<span ng-if="predicate == value">'
                        + '<span class="glyphicon glyphicon-chevron-up" ng-if="order"></span>'
                        + '<span class="glyphicon glyphicon-chevron-down" ng-if="!order"></span>'
                    + '</span>'
                    + '<span ng-if="predicate != value">&nbsp;</span>' 
                + '</span>'
        };
    })

    .directive('yesNo', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: '=model'
            }, 
            template: 
                "<select ng-model='model' class='form-control'>"
                + "<option value=''>Select One</option>"
                + "<option value='1'>Yes</option>"
                + "<option value='0'>No</option>"
                + "</select>"
        }
    })

    // Taken from the internets.  http://stackoverflow.com/questions/8380759/why-isnt-this-textarea-focusing-with-focus
    // Losing the timeout since we're unconcerned with modals for the moment.
    .directive('focusMe', function($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function(scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function(value) {
//                    console.log('value=',value);
                    if(value === true) { 
                        // $timeout(function() {
                            element[0].focus(); 
                        // });
                    }
                });

                // to address @blesh's comment, set attribute value to 'false'
                // on blur event:
                element.bind('blur', function() {
//                    console.log('blur');
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    })