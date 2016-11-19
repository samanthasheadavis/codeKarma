angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope, $http, RequestService) {

  $scope.details = false;
  this.category = "Bug Fix";

  $scope.toggleDetails = function () {
    $scope.details = !$scope.details;
  };

  this.getUrl = function() {
  this.url = RequestService.getDevUrl();
};

  this.getProjects = function() {
    // RequestService.getAllProjects(function(response) {
    //   console.log(response);
    // });
  };

  // fork project function


  // add project info to user object


  // determine icon to show on project - grab category(fix_type )


  this.getIcon = function(responseObj) {

    this.category = responseObj.fix_type;

    if (this.category === "Bug Fix") {
      this.img = "bugfix";
      this.alt = "Icon Fair";
    } else if (this.category === "Design Update") {
      this.img = "design_update";
      this.alt = "Oliviu Stoian";
    } else if (this.category === "New Feature") {
      this.img = "new_feature";
      this.alt = "Phil Goodwin";
    }

  };

  this.getUrl();
  this.getProjects();

});
