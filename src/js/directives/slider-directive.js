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
                            setModel(false);
                            ctrl.revertButton();
                        } else if (scope.progress === 100) {
                            setModel(true);
                            ctrl.updateButton();
                        }
                    });
                }
            }).slider("pips");
        }
    };
});
