angular.module('codeKarmaApp').controller('CommunityFeedController', function($state, $scope, RequestService) {

    this.post = '';
    this.response = '';

    this.addPost = function() {
        this.newQuestion = {
            "karma_question": this.post
        };
        RequestService.postQuestion(this.newQuestion);
        this.post = '';
    };

    this.getPosts = function() {
        RequestService.getPosts(function(response) {
            $scope.posts = response;

            console.log($scope.posts);
            // this.date = $scope.posts.created.slice(0, 10);
            // this.time = $scope.posts.created.slice(11, 19);
            // $scope.posts.timeElapsed = this.date + ' ' + this.time;

            for (var index = 0; index < $scope.posts.length; index++) {

                if ($scope.posts[index].comments.length > 0) {
                    var currentPost = $scope.posts[index].comments;

                    for (var commIndex = 0; commIndex < currentPost.length; commIndex++) {

                        this.commentDate = currentPost[commIndex].created.slice(0, 10);
                        this.commentTime = currentPost[commIndex].created.slice(11, 19);
                        currentPost[commIndex].commentTimestamp = this.commentDate + ' ' + this.commentTime;
                    }
                }
            }
            $scope.$apply();
        });

    };

    this.addResponse = function(comment, id) {
        // var newResponse = $('<p>').attr('class', 'response').html(comment).appendTo('.responsesContainer');
        this.newComment = {
            "karma_comment": comment,
            "karma_question_id": id
        };
        RequestService.postComment(this.newComment);
        this.response = '';
    };

    this.updateQuestionLikes = function(likes, id) {
        likes++;
        this.likes = {
          "likes": likes,
        };
        console.log(this.likes);
        RequestService.updateQuestionLikes(this.likes, id);
    };

    this.updateCommentLikes = function(likes, id) {
        likes++;
        this.likes = {
          "likes": likes,
        };
        console.log(this.likes);
        RequestService.updateCommentLikes(this.likes, id);
    };

    this.getDev = function() {
        RequestService.getDev(function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
            getLeaderboard();
        });
    };

    function findUserStats(array, attr, value) {
        for (var index = 0; index < array.length; index += 1) {
            if (array[index][attr] === value) {
              $scope.currentUserStats = {
                username: $scope.leaderboard[index].developer_name,
                points: $scope.leaderboard[index].karma_points,
                image: $scope.leaderboard[index].developer_image,
                total_devs: $scope.leaderboard[index].total_developers,
                rank: $scope.leaderboard[index].developer_rank
              };
              $scope.$apply();
            }
        }
        return -1;
    }

    function getLeaderboard() {
        RequestService.getLeaderboard(function(response) {
            $scope.leaderboard = response.all_developer_rankings;
            findUserStats($scope.leaderboard, 'developer_name', $scope.currentUser.username);

        });
    }

    this.getDev();
    this.getPosts();

});
