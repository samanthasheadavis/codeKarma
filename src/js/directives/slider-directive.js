angular.module('codeKarmaApp').directive("slider", function() {
    return {
        restrict: 'A',
        scope: {
            progress: "=model",
            updateButton: "&"
        },
        link: function(scope, devProjects) {
            var setModel = function(value) {
                scope.model = value;
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
                            devProjects.complete = false;
                            console.log(devProjects.complete);
                        } else if (scope.progress === 100) {
                            devProjects.complete = true;

                            scope.updateButton();
                            console.log(devProjects.complete);
                        }
                    });
                }
            }).slider("pips");
        }
    };
});
