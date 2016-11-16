angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope) {

  var hideDev = true;
  var hideClient = true;

  // this.view = function() {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        this.url = toState.url;
        if (this.url === 'developer/all-projects' || this.url === 'developer/community-feed' || this.url === 'developer/dashboard' || this.url === 'developer/projects') {
          console.log('dev');
            hideDev = true;
            // return hideDev;
        } else if (this.url === 'client/dashboard' || this.url === 'client/projects' || this.url === 'client/add-project') {
          console.log('client');
            hideClient = true;
            // return hideClient;
        }
    });
  // };

      return {
        hideDev: hideDev,
        hideClient: hideClient
      };



      angular.module('codeKarmaApp').service('Nav', function($location, $rootScope) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            this.url = toState.url;
            if (this.url === 'developer/all-projects' || this.url === 'developer/community-feed' || this.url === 'developer/dashboard' || this.url === 'developer/projects') {
              console.log('dev');
                hideDev = true;
                return hideDev;
            } else if (this.url === 'client/dashboard' || this.url === 'client/projects' || this.url === 'client/add-project') {
              console.log('client');
                hideClient = true;
                return hideClient;
            }
        });

          return {
            hideDev: hideDev,
            hideClient: hideClient
          };

  });












    // var hideDev = true;
    // var hideClient = true;
    //
    //   $(window).on('hashchange', function() {
    //     console.log('in');
    //
    //       if ($location.url() === '/developer/all-projects' || $location.url() === '/developer/community-feed' ||  $location.url() === '/developer/dashboard' || $location.url() === '/developer/projects') {
    //         hideDev = true;
    //         return hideDev;
    //       } else if ($location.url() === '/client/dashboard' || $location.url() === '/client/projects' || $location.url() === '/client/add-project'){
    //         hideClient = true;
    //         return hideClient;
    //       }
    //       // else if ($location.url() === '/') {
    //       //   hideDev = true;
    //       //   return this.hide;
    //       // }
    //   });
    //
    // return {
    //   hideDev: hideDev,
    //   hideClient: hideClient
    // };
});
