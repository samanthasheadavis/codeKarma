angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope, $http, RequestService) {

    $scope.details = false;
    this.selectedProject = null;


    $scope.toggleDetails = function(project) {
        project.show = !project.show;
    };

    this.getUrl = function() {
        this.url = RequestService.getProjectsUrl();
    };

    $scope.getIcon = function(response) {

        for (var index = 0; index < response.length; index++) {

            if (response[index].fix_type === "Bug Fix") {
                response[index].src = "assets/bugfix.png";
                response[index].alt = "Icon Fair";
            } else if (response[index].fix_type === "Design Update") {
                response[index].src = "assets/design_update.png";
                response[index].alt = "Oliviu Stoian";
            } else if (response[index].fix_type === "New Feature") {
                response[index].src = "assets/new_feature.png";
                response[index].alt = "Phil Goodwin";
            }
        }

    };


    this.getProjects = function() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": this.url,
            "method": "GET"
        };

        $.ajax(settings).done(function(response) {

            $scope.projects = response.all_projects;
            console.log($scope.projects);
            $scope.getIcon(response.all_projects);

            $scope.$apply();

        });

    };



    // fork project function


    // add project info to user object


    // determine icon to show on project - grab category(fix_type )




    this.getUrl();
    $scope.projects = this.getProjects();
});
