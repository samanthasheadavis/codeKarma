angular.module('codeKarmaApp').directive("slider", function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            progress: "=model",
            project: "=project",
            updateButton: "&updateButton"
        },
        controller: 'DevProjectsController',
        controllerAs: 'devProjects',
        link: function(scope, element, attributes, ctrl) {
          var setModel = function(value) {
            ctrl.complete = value;
          };

          $(".flat-slider").slider({
              min: 0,
              max: 100,
              step: 10,
              range: "min",
              slide: function(event, ui) {
                var progress = ui.value;
                var parentElement = $(ui.handle).parent();
                var projectId = parentElement.attr('data-project-id');
                var progressElement = parentElement.siblings('.progress');
                
                progressElement.text(progress + '%');

                if (progress !== 100) {
                  setModel(false);
                  ctrl.revertButton(progress, projectId);
                } else if (progress === 100) {
                  setModel(true);
                  ctrl.updateButton(progress, projectId);
                }
              }
          }).slider("pips");
        }
    };
});
