angular.module('codeKarmaApp').service('ClientService', function($http, $location, $state) {

<<<<<<< HEAD
    //
    // function getClientProjectsUrl(storedToken, storedId) {
    //     var url = "https://code-karma-api.herokuapp.com/projects/" + storedId + "?token=" + storedToken;
    //     return url;
    // }

    function getClient(storedToken, storedId, callback) {
        $http({
            method: 'GET',
            url: "https://code-karma-api.herokuapp.com/clients/" + storedId + "?token=" + storedToken,
        }).then(callback, function errorCallback(response) {
            return response;
        });
    }

    function deleteProject(storedToken, projectId, callback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + projectId + "?token=" + storedToken,
            "method": "DELETE"
        };

        $.ajax(settings).done(callback);
    }

    function getProjectsUrl(storedToken) {
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + storedToken;
        return url;
    }

    function createProject(storedToken, data, callback) {
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + storedToken;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "POST",
            "data": data
        };

        $.ajax(settings).done(callback);

    }

    function updateClientInfo(storedToken, storedId, data, callback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/clients/" + storedId + "?token=" + storedToken,
            "method": "PUT",
            "data": data
        };

        $.ajax(settings).done(callback);
    }

    function getClientProjects(storedToken, storedId, callback) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + storedId + "?token=" + storedToken,
            "method": "GET"
        };

        $.ajax(settings).done(callback);
    }

    function updateClientProject(storedToken, projectId, data, callback) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://code-karma-api.herokuapp.com/projects/" + projectId + "?token=" + storedToken,
            "method": "PUT",
            "data": data
        };

        $.ajax(settings).done(callback);
    }

    return {
        getClientProjectsUrl: getClientProjectsUrl,
        getClient: getClient,
        deleteProject: deleteProject,
        getProjectsUrl: getProjectsUrl,
        createProject: createProject,
        updateClientInfo: updateClientInfo,
        getClientProjects: getClientProjects
    };
=======
function getClientProjectsUrl(storedToken, storedId) {
    var url = "https://code-karma-api.herokuapp.com/projects/" + storedId + "?token=" + storedToken;
    return url;
}

function getClient(storedToken, storedId, callback) {
    $http({
        method: 'GET',
        url: "https://code-karma-api.herokuapp.com/clients/" + storedId + "?token=" + storedToken,
    }).then(callback, function errorCallback(response) {
        return response;
    });
}

function deleteProject(storedToken, projectId, callback) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://code-karma-api.herokuapp.com/projects/" + projectId + "?token=" + storedToken,
    "method": "DELETE"
  };

  $.ajax(settings).done(callback);
}

function getProjectsUrl(storedToken) {
    var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + storedToken;
    return url;
}

return {
  getClientProjectsUrl: getClientProjectsUrl,
  getClient: getClient,
  deleteProject: deleteProject,
  getProjectsUrl: getProjectsUrl
};
>>>>>>> 9370a5f0331cb719ee946478050ed9dc268eb1c3

});
