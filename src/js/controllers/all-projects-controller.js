angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope, $http, RequestService) {
    var storedToken = RequestService.getLocalToken();
    var storedId = RequestService.getLocalId();

    $scope.details = false;
    this.selectedProject = null;

    $scope.toggleDetails = function(project) {
        project.show = !project.show;
    };

    this.getDev = function() {
        RequestService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
        });
    };

    this.getUrl = function() {
        this.url = RequestService.getProjectsUrl(storedToken);
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
            $scope.getIcon(response.all_projects);
            $scope.$apply();
            $scope.languages($scope.projects);
        });

    };
    $scope.languages = function(response) {

    };
    // fork project function

    $scope.forkRepo = function(project) {
      this.id = project.id;
      RequestService.forkRepo(storedToken, this.id);
    };

    // add project info to user object


    // Search functionality

    this.keyword = '';


    this.getUrl();
    this.getDev();
    $scope.projects = this.getProjects();
});
