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
          console.log(response);
            $scope.projects = response;
            $scope.icons(response);
            $scope.handleProgress(response);
            $scope.$apply();
        });
    };

    $scope.handleProgress = function(response) {
      for (count=0; count<response.length; count++) {
        if (response[count].developer_project.length === 0) {
          console.log('null');
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

    // collect edited data

    this.updateInfo = function(project) {
        project.showTitleEdit = !project.showTitleEdit;
        project.showSnapshotEdit = !project.showSnapshotEdit;
        project.showDescriptionEdit = !project.showDescriptionEdit;
        project.showGithubRepoEdit = !project.showGithubRepoEdit;
    };

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

    this.quitModal = function() {
      this.show = false;
      $('.client-projects-container').removeClass('modal-up');
    };

    this.updateInfo = function() {
        console.log(this.updateProject);

        this.token = RequestService.fetchToken();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + this.id + "?token=" + this.token,
            "method": "PUT",
            "data": this.updateProject
        };

        $.ajax(settings).done(function(response) {
            this.show = false;
            $state.reload();
        });

    };

    // post updated object to backend

    this.getProjects();

});
