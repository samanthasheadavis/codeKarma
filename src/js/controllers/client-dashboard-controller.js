angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, RequestService, $scope, $http) {

    // Have to edit this in service to make sure posting to correct url for updating client info
    this.getUrl = function() {
        this.url = RequestService.getProjectsUrl();
    };

    // orgName and orgLink refer to the 'organization name' and 'website link' fields.

    this.clientInfo = {
      orgName: "Add a name for your organization",
      orgLink: "Add a link to your website"
    };

    $scope.handleInfo = function(response) {
      if (response.orgName === null || response.orgSite === null) {
        this.showLinkEdit = false;
        this.showNameEdit = false;
      }
    };

    // updateInfo is the function that handles passing the updated org name or org link to the back end.
    this.updateInfo = function() {

        this.showLinkEdit = false;
        this.showNameEdit = false;

        console.log(this.clientInfo);

        this.token = RequestService.fetchToken();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/clients/" + this.id + "?token=" + this.token,
            "method": "PUT",
            "data": this.clientInfo
        };

        $.ajax(settings).done(function(response) {
            this.show = false;
            $state.reload();
        });


    };


    this.getClient = function() {

        RequestService.getClient(function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
            console.log($scope.currentUser);
            $scope.handleInfo($scope.currentUser);
        });
    };

    this.getClient();
    this.getUrl();

});
