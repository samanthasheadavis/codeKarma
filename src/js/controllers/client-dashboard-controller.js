angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, RequestService, $scope, $http) {

    // Have to edit this in service to make sure posting to correct url for updating client info
    this.getUrl = function() {
        this.url = RequestService.getProjectsUrl();
    };

    // orgName and orgLink refer to the 'organization name' and 'website link' fields.

    this.clientInfo = {
      name: "Add a name for your organization",
      site: "Add a link to your website"
    };

    $scope.handleInfo = function(response) {
      console.log(response);

      if (response.orgName === null || response.orgSite === null) {
        this.showLinkEdit = false;
        this.showNameEdit = true;
      }

      this.newInfo = {
        organization_name: response.orgName,
        organization_site: response.orgSite
      };

    };

    // updateInfo is the function that handles passing the updated org name or org link to the back end.
    this.updateInfo = function() {

        this.showLinkEdit = false;
        this.showNameEdit = false;

        this.token = RequestService.fetchToken();
        this.id = RequestService.fetchId();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/clients/" + this.id + "?token=" + this.token,
            "method": "PUT",
            "data": this.newInfo
        };

        $.ajax(settings).done(function(response) {
          console.log(response);
          $state.reload();
        });
    };


    this.getClient = function() {

        RequestService.getClient(function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
            $scope.handleInfo($scope.currentUser);
        });
    };

    this.getClient();
    this.getUrl();

});
