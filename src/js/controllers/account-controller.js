angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope, RequestService) {

  this.getUser = function() {

    RequestService.getUser(function(response) {

      console.log(response);

      this.currentUser = {

        username: response.data.info.nickname,
        name: response.data.info.name,
        email: response.data.info.email,
        image: response.data.info.image,
        github: response.data.info.urls.GitHub

      };

      console.log(this.currentUser);

    });
  };

  this.getUser();
});
