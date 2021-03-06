angular.module('directive.material-input-group', [
])
.directive('materialInputGroup', [
    function materialInputGroup() {
        return {
            restrict: 'C',
            scope: {
                ngModel: '='
            },
            link: function($scope, $element, $attr) {
                // Grab the input child, and just do nothing if there is no child
                var input = $element[0].querySelector('input');
                if(!input) {
                    return;
                }

                input = angular.element(input);
                var ngModelCtrl = input.controller('ngModel');

                // When the input value changes, check if it "has" a value, and
                // set the appropriate class on the input group
                if (ngModelCtrl) {
                    $scope.$watch(
                        function() {
                            return ngModelCtrl.$viewValue;
                        },
                        onInputChange
                    );
                }
                input.on('input', onInputChange);

                // When the input focuses, add the focused class to the group
                input.on('focus', function(e) {
                    $element.addClass('material-input-focused');
                });
                // When the input blurs, remove the focused class from the group
                input.on('blur', function(e) {
                    $element.removeClass('material-input-focused');
                });

                function onInputChange() {
                    $element.toggleClass('material-input-has-value', !!input.val());
                }
            }
        };
    }
]);