angular.module('codeKarmaApp').controller('RedirectController', function($state, RequestService, $location) {

  // function to determine if the user is a client or developer and redirect them to their dashboard
RequestService.getToken();

});
