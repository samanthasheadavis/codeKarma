angular.module('codeKarmaApp').controller('DevProjectsController', function($state) {

  this.complete = false;

  // update and post progress

  this.updateStatus = function(status) {

    this.status = status;

    if (this.status !== "100") {
      this.complete = false;
    } else if (this.status === "100") {
      this.complete = true;
    }

    console.log(this.status);
    console.log(this.complete);
    // $state.reload();

  };

  // update and post est. completion date


  // if progress < 100%, show "ask for help" button


  // if progress === 100%, show "submit project"

});
