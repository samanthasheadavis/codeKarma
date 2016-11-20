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

    $.ajax(settings).done(function(response) {
        console.log(response);
    });

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

        this.token = RequestService.fetchToken();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + this.id + "?token=" + this.token,
            "method": "PUT",
            "headers": {
                "cache-control": "no-cache",
            },
            "processData": false,
            "contentType": false,

            "data": this.updateProject
        };

        $.ajax(settings).done(function(response) {
            console.log(response);
        });

        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://code-karma-api.herokuapp.com/projects/1?token=082915de-e826-4b76-945f-05bb37036104",
        //     "method": "PUT",
            // "headers": {
            //     "cache-control": "no-cache",
            //     "postman-token": "7fba87be-0701-814a-4d49-2bd257d9e7e4"
            // },
            // "processData": false,
            // "contentType": false,
        //     "mimeType": "multipart/form-data",
        //     "data": form
        // };

    };

    // post updated object to backend

    this.getProjects();

});
