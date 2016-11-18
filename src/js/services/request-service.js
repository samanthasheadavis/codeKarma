angular.module('codeKarmaApp').service('RequestService', function($http, $location, $state) {

var token = '';

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
    dashboardRedirect();
  }

function getClient(callback) {
  $http({
      method: 'GET',
      url: 'https://code-karma-api.herokuapp.com/clients/1?token=' + token,
  }).then(callback, function errorCallback(response) {
      return createUser(response.data.info);
  });
}

function getDev(callback) {
  $http({
      method: 'GET',
      url: 'https://code-karma-api.herokuapp.com/developers/2?token=' + token,
  }).then(callback, function errorCallback(response) {
      return createUser(response.data.info);
  });
}

function createUser(response) {
  this.currentUser = {
      username: response.nickname,
      name: response.name,
      email: response.email,
      image: response.image,
      github: response.urls.GitHub
  };
  return this.currentUser;
}

return {
    getClient: getClient,
    getDev: getDev,
    getToken: getToken
};

});
