angular.module('codeKarmaApp').service('RequestService', function($http, $location, $state, localStorageService) {

    var token;
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

        setLocalToken(token);
        setLocalId(userId);

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

    function getProjectsUrl(storedToken) {
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + storedToken;
        return url;
    }

    function getClientProjectsUrl(storedToken, storedId) {
        var url = "https://code-karma-api.herokuapp.com/projects/" + storedId + "?token=" + storedToken;
        return url;
    }

    function getDevUrl(storedToken, id) {
        var url = "https://code-karma-api.herokuapp.com/developers/" + id + "?token=" + storedToken;
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

    function getDev(storedToken, id, callback) {
        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/developers/' + id + '?token=' + storedToken,
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
            commits: response.commits,
            skills: response.skills || []
        };
        return currentUser;
    }

    function setProgress(storedToken, progress, id) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/developer_projects/' + id + '?token=' + storedToken,
            "method": "PUT",
            "data": progress
        };
        $.ajax(settings).done(function(response) {
            console.log(response);
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

    function forkRepo(storedToken, id) {
        $http({
            method: 'POST',
            url: 'https://code-karma-api.herokuapp.com/projects/' + id + '?token=' + storedToken
        }).then(function successCallback(response) {
            $state.go('codeKarmaParent.devProjects');
        }, function errorCallback(response) {
            return response;
        });
    }

    function putSkills(storedToken, id, skills) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/developers/' + id + '?token=' + storedToken,
            "method": "PUT",
            "data": skills
        };
        $.ajax(settings).done(function(response) {
            return response;
        });
    }

    function getDevProjects(storedToken, id, callback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/developers_my_projects/' + id + '?token=' + storedToken,
            "method": "GET"
        };

        $.ajax(settings).done(callback);

    }

    function getLeaderboard(storedToken, callback) {
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'https://code-karma-api.herokuapp.com/developers/rank?token=' + storedToken,
          "method": "GET"
      };

      $.ajax(settings).done(callback);
    }

    function postQuestion(post, storedToken, callback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/karma_questions?token=' + storedToken,
            "method": "POST",
            "data": post
        };

        $.ajax(settings).done(callback);

    }

    function getPosts(storedToken, callback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/karma_comments?token=' + storedToken,
            "method": "GET",
        };

        $.ajax(settings).done(callback);
    }

    function postComment(post, storedToken) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/karma_comments?token=' + storedToken,
            "method": "POST",
            "data": post
        };

        $.ajax(settings).done(function(response) {
          console.log(response);
        });
    }

    function updateQuestionLikes(likes, id, storedToken, callback){

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'https://code-karma-api.herokuapp.com/karma_question/' + id + '?token=' + storedToken,
          "method": "PUT",
          "data": likes
      };
      $.ajax(settings).done(callback);
    }

    function updateCommentLikes(likes, id, storedToken, callback){

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": 'https://code-karma-api.herokuapp.com/karma_comment/' + id + '?token=' + storedToken,
          "method": "PUT",
          "data": likes
      };
      $.ajax(settings).done(callback);
    }

    function getLocalToken() {
        return localStorageService.get('storedToken') || [];
    }

    function setLocalToken(token) {
      localStorageService.set('storedToken', token);
    }

    function getLocalId() {
        return localStorageService.get('storedId') || [];
    }

    function setLocalId(id) {
      localStorageService.set('storedId', id);
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
        getPosts: getPosts,
        postComment: postComment,
        updateQuestionLikes: updateQuestionLikes,
        updateCommentLikes: updateCommentLikes,
        getLocalToken: getLocalToken,
        setLocalToken: setLocalToken,
        getLocalId: getLocalId,
    };

});
