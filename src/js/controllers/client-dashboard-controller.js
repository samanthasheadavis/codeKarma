angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, RequestService) {

    // orgName and orgLink refer to the 'organization name' and 'website link' fieds.
    this.orgName = "Your Organization's Name";
    this.orgLink = 'Your Website Link';

    // updateInfo is the function that handles passing the updated org name or org link to the back end.
    this.updateInfo = function() {

        this.showLinkEdit = false;
        this.showNameEdit = false;
    };

    this.getClient = function() {

      RequestService.getClient(function(response) {
        var currentUser = RequestService.createUser(response.data.info);
        console.log("token: " + token);

      });
    };


    this.getClient();

});
