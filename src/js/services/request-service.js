angular.module('codeKarmaApp').service('RequestService', function($http, $location) {


function getToken(callback) {
  var url = $location.url();
  this.token = this.url.match(/\#(?:token)\=([\S\s]*?)\&/)[1];
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
