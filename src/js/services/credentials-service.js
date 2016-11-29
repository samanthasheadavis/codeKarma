angular.module('codeKarmaApp').service('CredentialsService', function($http, $location, $state, localStorageService) {

  function dashboardRedirect() {
      var url = $location.url();

      if (url.includes("Client")) {
          $state.go('codeKarmaParent.clientDashboard');
      } else if (url.includes("Developer")) {
          $state.go('codeKarmaParent.devDashboard');
      }
  }

  function getToken() {
      var url = $location.url();
      token = url.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)[0];
      userId = url.match(/id=([0-9]+)/)[1];

      setLocalToken(token);
      setLocalId(userId);

      if (url.includes("redirect")) {
          dashboardRedirect();
      } else {
          return token;
      }
  }

  // function fetchToken() {
  //     return token;
  // }
  //
  // function fetchId() {
  //     return userId;
  // }

  function createUser(response) {

      currentUser = {
          username: response.nickname,
          name: response.name,
          email: response.email,
          image: response.image,
          github: response.github,
          orgName: response.organization_name,
          orgSite: response.organization_site,
          commits: response.commits,
          skills: response.skills || []
      };
      return currentUser;
  }

  function getLocalToken() {
      return localStorageService.get('storedToken') || [];
  }

  function setLocalToken(token) {
    localStorageService.set('storedToken', token);
  }

  function getLocalId() {
      return localStorageService.get('storedId') || [];
  }

  function setLocalId(id) {
    localStorageService.set('storedId', id);
  }

  return {
    getToken: getToken,
    createUser: createUser,
    getLocalToken: getLocalToken,
    setLocalToken: setLocalToken,
    getLocalId: getLocalId,
    setLocalId: setLocalId
  };

});
