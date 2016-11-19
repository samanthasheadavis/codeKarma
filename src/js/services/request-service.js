angular.module('codeKarmaApp').service('RequestService', function($http, $location, $state) {

    var token = '';
    var currentUser = '';
    var userId = '';

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

        if (url.includes("redirect")) {
            dashboardRedirect();
        } else {
            return token;
        }
    }

    function getProjectsUrl() {
        console.log('in getUrl');
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + token;
        return url;
    }

    function getDevUrl() {
        console.log('in getUrl');
        var url = "https://code-karma-api.herokuapp.com/developers/" + userId + "?token=" + token;
        return url;
    }

    function getClient(callback) {
        $http({
            method: 'GET',
            url: "https://code-karma-api.herokuapp.com/clients/" + userId + "?token=" + token,
        }).then(callback, function errorCallback(response) {
            return response;
        });
    }

    function getDev(callback) {
        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/developers/' + userId + '?token=' + token,
        }).then(callback, function errorCallback(response) {
            return response;
        });
    }

    function createUser(response) {
        currentUser = {
            username: response.nickname,
            name: response.name,
            email: response.email,
            image: response.image,
            github: response.urls.GitHub,
        };
        return currentUser;
    }

    function setProgress(progress) {
      $http({
          method: 'PATCH',
          url: '',
      }).then(callback, function errorCallback(response) {
          return response;
      });
    }

    function setEstDate(date) {
      $http({
          method: 'PATCH',
          url: '',
      }).then(callback, function errorCallback(response) {
          return response;
      });
    }

    return {
        getClient: getClient,
        getDev: getDev,
        getToken: getToken,
        createUser: createUser,
        getProjectsUrl: getProjectsUrl,
        getDevUrl: getDevUrl,
        setProgress: setProgress,
        setEstDate: setEstDate,
    };

});
