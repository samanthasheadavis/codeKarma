// angular.module('codeKarmaApp').service('NavService', function($location, $rootScope) {
//
//   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
//       this.url = toState.url;
//       if (this.url === 'developer/all-projects' || this.url === 'developer/community-feed' || this.url === 'developer/dashboard' || this.url === 'developer/projects') {
//         console.log('dev');
//           hideDev = true;
//           return hideDev;
//       } else if (this.url === 'client/dashboard' || this.url === 'client/projects' || this.url === 'client/add-project') {
//         console.log('client');
//           hideClient = true;
//           return hideClient;
//       }
//   });
//
//     return {
//       hideDev: hideDev,
//       hideClient: hideClient
//     };
//
// });
