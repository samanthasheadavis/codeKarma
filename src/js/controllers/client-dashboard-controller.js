angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, $scope, $http, CredentialsService, ClientService) {

  // create variables for storedId and storedToken from CredentialsService to pass into requests to backend.

    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

    // HandleInfo checks to see if a user has saved an organization name or an organization site
    // if they haven't, the link icon will show but the empty field won't show.

    $scope.handleInfo = function(response) {
      console.log(response);

      if (response.orgName === null || response.orgSite === null) {
        this.showLinkEdit = false;
        this.showNameEdit = true;
      }

      // this.newInfo is an object that takes the updated orgName and orgSite

      this.newInfo = {
        organization_name: response.orgName,
        organization_site: response.orgSite
      };
    };

    // updateInfo is the function that handles passing the updated org name or org link to the back end.

    this.updateInfo = function() {

        this.showLinkEdit = false;
        this.showNameEdit = false;

        ClientService.updateClientInfo(storedToken, storedId, this.newInfo, function(response) {
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
});
