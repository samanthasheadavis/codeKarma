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
                response[index].img_src = "bugfix";
                response[index].img_alt = "Icon Fair";
            } else if (response[index].fix_type === "Design Update") {
                response[index].img_src = "design_update";
                response[index].img_alt = "Oliviu Stoian";
            } else if (response[index].fix_type === "New Feature") {
                response[index].img_src = "new_feature";
                response[index].img_alt = "Phil Goodwin";
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

    $scope.forkRepo = function(project) {


    };


    // add project info to user object


    // determine icon to show on project - grab category(fix_type )




    this.getUrl();
    $scope.projects = this.getProjects();
});
