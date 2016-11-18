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

        if (url.includes("redirect")) {
            dashboardRedirect();
        } else {
            return token;
        }
    }

    function getUser(callback) {

        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/clients/1?token=' + token,
        }).then(callback, function errorCallback(response) {
            return response;
        });
    }

    return {
        getUser: getUser,
        getToken: getToken
    };

});
