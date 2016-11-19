angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, RequestService, $scope, $http) {

// Have to edit this in service to make sure posting to correct url for updating client info
    this.getUrl = function() {
        this.url = RequestService.getClientUrl();
    };

    // orgName and orgLink refer to the 'organization name' and 'website link' fieds.

    this.clientInfo = {
        orgName: "Your Organization's Name",
        orgLink: "Your Website Link"
    };

    // updateInfo is the function that handles passing the updated org name or org link to the back end.
    this.updateInfo = function() {

        this.showLinkEdit = false;
        this.showNameEdit = false;

    // might have to do two different posts, one for org name and one for org link

        // $http({
        //     method: "PUT",
        //     url: this.url,
        //     data: this.clientInfo
        // }).then(function successCallback(response) {
        //     console.log(response);
        // });

    };

    this.getClient = function() {

        RequestService.getClient(function(response) {
            $scope.currentUser = RequestService.createUser(response.data.info);
            console.log($scope.currentUser);
        });
    };

    this.getClient();
    this.getUrl();

});
