angular.module('codeKarmaApp').controller('ClientDashboardController', function($state, RequestService) {

// orgName and orgLink refer to the 'organization name' and 'website link' fieds.
    this.orgName = "Your Organization's Name";
    this.orgLink = 'Your Website Link';

// updateInfo is the function that handles passing the updated org name or org link to the back end.
    this.updateInfo = function() {

    this.showLinkEdit = false;
    this.showNameEdit = false;
};

    this.getUser = function() {

      RequestService.getUser(function(response) {

        this.currentClient = {

          username: response.data.info.nickname,
          name: response.data.info.name,
          email: response.data.info.email,
          image: response.data.info.image
          // github: response.data.info.url.GitHub

        };

        console.log(this.currentClient);

      });
    };

    this.getUser();

});

//OAUTH

// Users authorizing app to do login/view info on a 3rd party website
// will need both user token and github token
// get a token from github, have to store that and pass it every time posting/getting info from github
// post to back end - with user id, repo and access token that's getting forked, then back end makes request from github.

//grab domain token at end of url domain/#token=.....
