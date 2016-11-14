angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope) {
  $scope.details = false;

  $scope.toggleDetails = function () {
    console.log("in");
    $scope.details = !$scope.details;

  };

});
