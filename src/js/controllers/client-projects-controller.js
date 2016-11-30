angular.module('codeKarmaApp').controller('ClientProjectsController', function($state, $scope, ClientService, CredentialsService) {

  // create variables for storedId and storedToken from CredentialsService to pass into requests to backend.

    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

    // Collect client projects by accessing getClientProjects in the ClientService, then passing the response to icons and handleprogress

    this.getProjects = function() {

        ClientService.getClientProjects(storedToken, storedId, function(response) {
          $scope.projects = response;
          $scope.icons(response);
          $scope.handleProgress(response);
          $scope.$apply();
        });
    };

    // handleProgress is a function that populates the estimated completion date for each project

    $scope.handleProgress = function(response) {
      for (count=0; count<response.length; count++) {
        if (response[count].developer_project.length === 0) {
        } else {
          for (index = 0; index<response[count].developer_project.length; index++) {
            if (response[count].developer_project[index].completion_dates !== null) {
              var dateString = response[count].developer_project[index].completion_dates;
              var date = dateString.slice(0, 15);
              response[count].developer_project[index].completion_dates = date;
            }
          }
        }
      }
    };

    // icons associates each fix_type with the correct icon and alt info

    $scope.icons = function(response) {

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

    // updateInfo shows the edit modal

    this.updateInfo = function(project) {
        project.showTitleEdit = !project.showTitleEdit;
        project.showSnapshotEdit = !project.showSnapshotEdit;
        project.showDescriptionEdit = !project.showDescriptionEdit;
        project.showGithubRepoEdit = !project.showGithubRepoEdit;
    };

    // edit collects the new client project info in the updateProject container

    this.edit = function(title, briefDescription, description, repoUrl, id) {
      $('.client-projects-container').addClass('modal-up');
        this.updateProject = {
            title: title,
            brief_description: briefDescription,
            description: description,
            github_repo_url: repoUrl
        };
        this.id = id;
        this.show = true;
    };

    // quitModal closes the edit modal

    this.quitModal = function() {
      this.show = false;
      $('.client-projects-container').removeClass('modal-up');
    };

    //updateInfo passes the new client project updated info to the back end via a PUT

    this.updateInfo = function() {

        ClientService.updateClientProject(storedToken, this.id, this.updateProject, function(response) {
          this.show = false;
          $state.reload();
        });
    };

    // deleteProject allows the client to delete a project by accessing the deleteProject function in ClientService

    this.deleteProject = function(projectId) {
      var self = this;
      ClientService.deleteProject(storedToken, projectId, function(response) {
        self.getProjects();
      });
    };

    // post updated object to backend

    this.getProjects();

});
