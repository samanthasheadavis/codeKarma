angular.module('codeKarmaApp').service('DevService', function($http, $location, $state) {

    function getDev(storedToken, id, callback) {
        $http({
            method: 'GET',
            url: 'https://code-karma-api.herokuapp.com/developers/' + id + '?token=' + storedToken,
        }).then(callback, function errorCallback(response) {
            return response;
        });
    }

    function getProjectsUrl(storedToken) {
        var url = "https://code-karma-api.herokuapp.com/projects" + "?token=" + storedToken;
        return url;
    }

    function getDevUrl(storedToken, id) {
        var url = "https://code-karma-api.herokuapp.com/developers/" + id + "?token=" + storedToken;
        return url;
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
        }).then(function successCallback(response) {}, function errorCallback(response) {
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

    function updateQuestionLikes(likes, id, storedToken, callback) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/karma_question/' + id + '?token=' + storedToken,
            "method": "PUT",
            "data": likes
        };
        $.ajax(settings).done(callback);
    }

    function updateCommentLikes(likes, id, storedToken, callback) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://code-karma-api.herokuapp.com/karma_comment/' + id + '?token=' + storedToken,
            "method": "PUT",
            "data": likes
        };
        $.ajax(settings).done(callback);
    }

    return {
        getDev: getDev,
        getProjectsUrl: getProjectsUrl,
        getDevUrl: getDevUrl,
        setProgress: setProgress,
        setEstDate: setEstDate,
        forkRepo: forkRepo,
        putSkills: putSkills,
        getDevProjects: getDevProjects,
        getLeaderboard: getLeaderboard,
        postQuestion: postQuestion,
        getPosts: getPosts,
        postComment: postComment,
        updateQuestionLikes: updateQuestionLikes,
        updateCommentLikes: updateCommentLikes
    };

});
