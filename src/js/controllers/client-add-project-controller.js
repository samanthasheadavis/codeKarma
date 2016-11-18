angular.module('codeKarmaApp').controller('ClientAddProjectController', function(RequestService, $state, $http) {


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
    $state.go('codeKarmaParent.clientProjects');

  };

  // post project object to backend
this.getToken = function() {
  this.token = RequestService.getToken();
  console.log(this.token);

  // create post url
};

});
