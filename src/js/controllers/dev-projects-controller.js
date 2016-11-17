angular.module('codeKarmaApp').controller('DevProjectsController', function($state, $scope) {

  this.complete = false;

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

  };



  // update and post est. completion date



});
