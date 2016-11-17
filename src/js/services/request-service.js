angular.module('codeKarmaApp').service('RequestService', function($http, $location) {

function getToken(callback) {
  console.log('in getToken on service');
  var url = $location.url();
  var token = url.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)[0];
  console.log(token);
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
