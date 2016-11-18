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
        var userId = url.match(/id=([0-9]+)/)[1];
        console.log(userId);

        if (url.includes("redirect")) {
        dashboardRedirect();
        } else {
            return token;
        }
    }

    function getClient(callback) {
        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/clients/' + userId + '?token=' + token,
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
      console.log(response);
        currentUser = {
            username: response.nickname,
            name: response.name,
            email: response.email,
            image: response.image,
            github: response.urls.GitHub,
        };
        console.log(currentUser);
        return currentUser;
    }

    return {
        getClient: getClient,
        getDev: getDev,
        getToken: getToken,
        createUser: createUser
    };

});
