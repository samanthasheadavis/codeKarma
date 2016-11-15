angular.module('codeKarmaApp').controller('AllProjectsController', function($state, $scope) {
  $scope.details = false;

  $scope.toggleDetails = function () {
    $scope.details = !$scope.details;
  };

});
