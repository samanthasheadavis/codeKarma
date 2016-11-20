angular.module('codeKarmaApp').controller('ClientProjectsController', function($state, RequestService, $scope) {
  this.message = "in ClientProjectsController";

// Collect client projects
  this.getProjects= function() {
    this.url = RequestService.getClientProjectsUrl();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": this.url,
        "method": "GET"
    };

    $.ajax(settings).done(function(response) {
      this.clientProjects = response;
        $scope.$apply();
    });
  };

  // collect edited data

  // post updated object to backend

this.getProjects();

});
