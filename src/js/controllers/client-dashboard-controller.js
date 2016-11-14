angular.module('codeKarmaApp').controller('ClientDashboardController', function($state) {
    this.message = "in ClientDashboardController";

});

//OAUTH

// Users authorizing app to do login/view info on a 3rd party website
// will need both user token and github token
// get a token from github, have to store that and pass it every time posting/getting info from github
// post to back end - with user id, repo and access token that's getting forked, then back end makes request from github.

//grab domain token at end of url domain/#token=.....
