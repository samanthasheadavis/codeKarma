angular.module('codeKarmaApp').service('RequestService', function($http) {

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
};

});
