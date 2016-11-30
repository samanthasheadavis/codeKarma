angular.module('codeKarmaApp').controller('ClientAddProjectController', function($state, $http, CredentialsService, ClientService) {
    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

    // this.url calls to the request service to get the correct url for posting to including the user id and token, and saves it in the controller variable this.url

    this.getUrl = function() {
        this.url = ClientService.getProjectsUrl(storedToken);
    };

    // collect form data and put into project object

    this.create = function(title, briefDescription, description, category, githubRepo) {
        console.log("in create" + this.url);
        this.newProject = {
            title: title,
            brief_description: briefDescription,
            description: description,
            fix_type: category,
            github_repo_url: githubRepo,
        };

        ClientService.createProject(storedToken, this.newProject, function(response) {
          $state.go('codeKarmaParent.clientProjects');
        });
    };

    this.getUrl();
});
