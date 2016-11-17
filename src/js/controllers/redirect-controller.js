angular.module('codeKarmaApp').controller('RedirectController', function($state, RequestService, $location) {

  // function to determine if the user is a client or developer and redirect them to their dashboard
  this.dashboardRedirect = function() {
    this.url = $location.url();

    if (this.url.includes("Client")) {
      console.log("hey client!");
    } else {
      console.log("that didn't work");
    }

  };

  this.dashboardRedirect();

});
