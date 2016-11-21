angular.module('codeKarmaApp').directive("slider", function() {
    return {
        restrict: 'A',
        scope: {
            config: "=config",
            price: "=model"
        },
        link: function(scope, elem, attrs) {
            var setModel = function(value) {
                scope.model = value;
            };

            $(".cdbl-slider").slider({
              min: 0,
              max: 100,
              step: 10,
              range: "min",
              slide: function(event, ui) {
                scope.$apply(function() {
                scope.price = ui.value;
              });
            }
            }).slider("pips");

        }
    };
});
