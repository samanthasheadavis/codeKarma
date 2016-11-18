angular.module('codeKarmaApp').controller('ClientAddProjectController', function($state, $http, RequestService) {

    // collect form data and put into project object

    this.create = function(title, briefDescription, description, category, githubRepo) {
        this.newProject = {
            title: title,
            brief_description: briefDescription,
            description: description,
            fix_type: category,
            github_repo_url: githubRepo,
            active_site_url: "grab from client object"
        };

        console.log(this.newProject);
        // $state.go('codeKarmaParent.clientProjects');

    };

    // post project object to backend

    this.getClient = function() {

      RequestService.getClient(function(response) {
        var currentUser = RequestService.createUser(response.data.info);
        console.log(currentUser);
      });
    };

    this.getToken = function() {
      this.url = $location.url();
      this.token = this.url.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)[0];
      this.userId = this.url.match(/id=([0-9]+)/)[1];
      console.log('url: ' + this.url + 'token' + this.token + 'userId' + this.userId);
    };

});
