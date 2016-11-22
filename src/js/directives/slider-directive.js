angular.module('codeKarmaApp').directive("slider", function() {
    return {
        restrict: 'A',
        scope: {
            progress: "=model",
            updateButton: "&updateButton"
        },
        controller: 'DevProjectsController',
        controllerAs: 'devProjects',
        link: function(scope, element, attributes, ctrl) {
            var setModel = function(value) {
                ctrl.complete = value;
            };

            $("#flat-slider").slider({
                min: 0,
                max: 100,
                step: 10,
                range: "min",
                slide: function(event, ui) {
                    scope.$apply(function() {
                        scope.progress = ui.value;
                        if (scope.progress !== 100) {
                            ctrl.complete = false;
                            setModel(false);
                        } else if (scope.progress === 100) {
                          setModel(true);
                            ctrl.complete = true;
                            scope.updateButton();
                        }
                    });
                }
            }).slider("pips");
        }
    };
});
