angular.module('codeKarmaApp').service('ClientService', function($http, $location, $state) {

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

});
