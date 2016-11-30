angular.module('codeKarmaApp').controller('RedirectController', function($state, CredentialsService, $location) {

  // function to determine if the user is a client or developer and redirect them to their dashboard
CredentialsService.getToken();

});
