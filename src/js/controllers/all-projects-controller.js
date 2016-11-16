angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope) {
  $scope.details = false;
  this.category = "bug fix";

  $scope.toggleDetails = function () {
    $scope.details = !$scope.details;
  };

  // fork project function



  // add project info to user object




});
