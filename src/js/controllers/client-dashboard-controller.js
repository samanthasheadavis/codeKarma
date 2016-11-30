angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, $scope, $http, CredentialsService, ClientService) {

    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

    // Have to edit this in service to make sure posting to correct url for updating client info
    this.getUrl = function() {
        this.url = ClientService.getProjectsUrl(storedToken);
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

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/clients/" + storedId + "?token=" + storedToken,
            "method": "PUT",
            "data": this.newInfo
        };

        $.ajax(settings).done(function(response) {
          console.log(response);
          $state.reload();
        });
    };


    this.getClient = function() {

        ClientService.getClient(storedToken, storedId, function(response) {
            $scope.currentUser = CredentialsService.createUser(response.data);
            $scope.handleInfo($scope.currentUser);
        });
    };

    this.getClient();
    this.getUrl();

});
