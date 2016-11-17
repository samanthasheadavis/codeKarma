angular.module('codeKarmaApp').service('RequestService', function($http, $location) {
var token = '';

function getToken(callback) {
  var url = $location.url();
  token = url.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);

  return token;
}

function getUser(callback) {


  $http({
      method: 'GET',
      url: 'https://code-karma-api.herokuapp.com/',
  }).then(callback, function errorCallback(response) {
      return response;
  });
}

return {
    getUser: getUser,
    getToken: getToken
};

});
