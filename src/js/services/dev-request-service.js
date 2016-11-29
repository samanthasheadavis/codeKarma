angular.module('codeKarmaApp').service('DevService', function($http, $location, $state) {


  function getDev(storedToken, id, callback) {
      $http({
          method: 'GET',
          url: 'https://code-karma-api.herokuapp.com/developers/' + id + '?token=' + storedToken,
      }).then(callback, function errorCallback(response) {
          return response;
      });
  }



  return {
    getDev: getDev,


  };







});
