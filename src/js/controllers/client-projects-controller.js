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
            console.log($scope.projects);
        });
    };

    // collect edited data

    this.updateInfo = function(project) {
        project.showTitleEdit = !project.showTitleEdit;
        project.showSnapshotEdit = !project.showSnapshotEdit;
        project.showDescriptionEdit = !project.showDescriptionEdit;
        project.showGithubRepoEdit = !project.showGithubRepoEdit;
    };

    this.edit = function(title, briefDescription, description, repoUrl, id) {
        this.updateProject = {
            title: title,
            brief_description: briefDescription,
            description: description,
            github_repo_url: repoUrl
        };
        this.id = id;
        this.show = true;
    };

    this.updateInfo = function() {
        console.log(this.updateProject);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": this.url,
            "method": "PUT",
            "data": this.updateProject
        };

        $.ajax(settings).done(function(response) {
            console.log(response);
            $state.go('codeKarmaParent.clientProjects');
        });


    };

    // post updated object to backend

    this.getProjects();

});
