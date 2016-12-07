angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope, $http, CredentialsService, DevService) {
    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();
    $scope.details = false;
    this.selectedProject = null;

    // toggle detail view of projects

    $scope.toggleDetails = function(project) {
        project.show = !project.show;
    };

    // get current user

    this.getDev = function() {
        DevService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = CredentialsService.createUser(response.data);
        });
    };

    // match fix-type image with project fix-type

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

    // populate page with available projects

    this.getProjects = function() {
        DevService.getAllProjects(storedToken, function(response) {
          $scope.projects = response.all_projects;
          $scope.getIcon(response.all_projects);
          $scope.$apply();
        });
    };

    // fork project function

    $scope.forkRepo = function(project) {
      this.id = project.id;
      DevService.forkRepo(storedToken, this.id, function(response) {
        project.showFork = true;
      });
    };


    this.getDev();
    $scope.projects = this.getProjects();
});
