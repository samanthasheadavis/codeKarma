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

    function fetchToken() {
      return token;
    }

    function fetchId() {
      return userId;
    }

    function getProjectsUrl() {
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + token;
        return url;
    }

    function getClientProjectsUrl() {
      var url = "https://code-karma-api.herokuapp.com/projects/" + userId + "?token=" + token;
      return url;
    }

    function getDevUrl() {
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
            github: response.github,
            orgName: response.organization_name,
            orgSite: response.organization_site,
            skills: response.skills || []
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

    function forkRepo(id) {
      $http({
          method: 'POST',
            url: 'https://code-karma-api.herokuapp.com/projects/' + id + '?token=' + token
      }).then(function successCallback(response) {
        $state.go('codeKarmaParent.devProjects');
      }, function errorCallback(response) {
          return response;
      });
    }

    function putSkills(skills){

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'https://code-karma-api.herokuapp.com/developers/' + userId + '?token=' + token,
          "method": "PUT",
          "data": skills
      };
      $.ajax(settings).done(function(response) {
        return response;
      });
    }

    function getDevProjects() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/developer_projects/' + userId + '?token=' + token,
            "method": "GET"
        };

        $.ajax(settings).done(function(response) {

            console.log(response);

            // $scope.projects = response.all_projects;
            // console.log($scope.projects);
            // $scope.getIcon(response.all_projects);
            // $scope.$apply();

        });

    }

    function getLeaderboard() {
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'url',
          "method": "GET"
      };

      $.ajax(settings).done(function(response) {

          console.log(response);

        });
    }

    function postQuestion(post) {
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'https://code-karma-api.herokuapp.com/karma_questions?token=' + token,
          "method": "POST",
          "data": post
      };

      $.ajax(settings).done(function(response) {

          console.log(response);

        });
    }

    function getPosts(callback) {
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'https://code-karma-api.herokuapp.com/karma_comments?token=' + token,
          "method": "GET",
      };

      $.ajax(settings).done(callback);
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
        getClientProjectsUrl: getClientProjectsUrl,
        forkRepo: forkRepo,
        fetchToken: fetchToken,
        putSkills: putSkills,
        fetchId: fetchId,
        getDevProjects: getDevProjects,
        getLeaderboard: getLeaderboard,
        postQuestion: postQuestion,
        getPosts: getPosts
    };

});
