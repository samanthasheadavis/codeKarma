angular.module('codeKarmaApp').service('RequestService', function($http, $location, $state) {

    var token = '';
    var currentUser = '';

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

        if (url.includes("redirect")) {
        dashboardRedirect();
        } else {
            return token;
        }
    }

    function getClient(callback) {
        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/clients/1?token=' + token,
        }).then(callback, function errorCallback(response) {
            console.log(response);
            createUser(response.data.info);
            return createUser;
        });
    }

    function getDev(callback) {
        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/developers/2?token=' + token,
        }).then(callback, function errorCallback(response) {
            console.log(response);

            createUser(response.data.info);
            return createUser;
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
        getToken: getToken
    };

});
