angular.module('codeKarmaApp').service('RequestService', function($http) {

  console.log('in service');

function getUserType(callback) {

  $http({
      method: 'GET',
      url: 'https://code-karma-api.herokuapp.com/',
  }).then(callback, function errorCallback(response) {
      return response;
  });
}

return {
    getUserType: getUserType,
};

});
