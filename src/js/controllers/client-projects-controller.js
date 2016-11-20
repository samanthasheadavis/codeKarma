angular.module('codeKarmaApp').controller('ClientProjectsController', function($state, RequestService, $scope) {
    this.message = "in ClientProjectsController";

    // Collect client projects
    this.getProjects = function() {
        this.url = RequestService.getClientProjectsUrl();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": this.url,
            "method": "GET"
        };

        $.ajax(settings).done(function(response) {
            $scope.projects = response;
            $scope.$apply();
        });
    };

    // collect edited data

    this.updateInfo = function(project) {
        project.showTitleEdit = !project.showTitleEdit;
        project.showSnapshotEdit = !project.showSnapshotEdit;
        project.showDescriptionEdit = !project.showDescriptionEdit;
        project.showGithubRepoEdit = !project.showGithubRepoEdit;
    };

    this.edit = function(title, briefDescription, description, repoUrl) {
      this.show = true;
      this.title = title;
      this.snapshot = briefDescription;
      this.description = description;
      this.repoUrl = repoUrl;
      $('.client-projects-container').toggleClass('darken');
    };
    // post updated object to backend

    this.getProjects();

});
