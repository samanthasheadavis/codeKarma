angular.module('codeKarmaApp').controller('DevProjectsController', function($scope, $state, RequestService) {

  this.complete = false;

  // get projects info

  // this.getProjects = function() {
  //   RequestService.getProjects(function(response) {
  //       $scope.projects = response;
  //       console.log($scope.projects);
  //     });
  // };



  $scope.slider_floor_ceil = {
        value: 10,
        options: {
            floor: 0,
            ceil: 100,
            step: 10
        }
    };

  // update and post progress

  this.updateStatus = function(status) {

    this.status = status;

    // if progress < 100%, show "ask for help" button
    // if progress === 100%, show "submit project" and disable est. completion date

    if (this.status !== "100") {
      this.complete = false;
    } else if (this.status === "100") {
      this.complete = true;
    }

    // RequestService.setProgress(progress);

  };

  this.updateEstDate = function(date) {

    // RequestService.setEstDate(date);

  };



  // update and post est. completion date


this.getProjects();

});
