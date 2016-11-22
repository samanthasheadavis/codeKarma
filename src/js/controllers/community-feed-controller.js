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

                        console.log(currentPost[commIndex].commentTimestamp);
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

    this.updateLikes = function(likes) {
        console.log(likes);
        likes++;
        this.likes = likes;
    };

    this.getDev = function() {

        RequestService.getDev(function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
        });
    };

    this.getLeaderboard = function() {
      RequestService.getLeaderboard(function(response) {
        console.log(response);
        $scope.leaderboard = response.all_developer_rankings;
      });
    };



    this.getDev();
    this.getPosts();
    this.getLeaderboard();
});
