angular.module('codeKarmaApp').controller('ClientAddProjectController', function($state, $http, CredentialsService, ClientService) {

    // create variables for storedId and storedToken from CredentialsService to pass into requests to backend.

    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

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

        // pass data to post function in ClientService when a client creates a project

        ClientService.createProject(storedToken, this.newProject, function(response) {
          $state.go('codeKarmaParent.clientProjects');
        });
    };
});
