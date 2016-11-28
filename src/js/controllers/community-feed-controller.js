angular.module('codeKarmaApp').controller('CommunityFeedController', function($state, $scope, RequestService, StorageService) {

    this.post = '';
    this.response = '';
    var self = this;
    var storedToken = RequestService.getLocalToken();
    var storedId = RequestService.getLocalId();
    // var likedQuestions = StorageService.getLikedQuestion();
    // var likeComments = StorageService.getLikedComment();
    // var likedQuestionArray = [];



    $scope.showMore = function(id) {
        for (var index = 0; index < $scope.posts.length; index += 1) {
            if ($scope.posts[index].question_id === id) {
                $scope.posts[index].showMore = $scope.posts[index].comments.length;
            }
        }
    };

    this.addPost = function() {
        this.newQuestion = {
            "karma_question": this.post
        };
        RequestService.postQuestion(this.newQuestion, storedToken, function(response) {
            self.getPosts();
        });
        this.post = '';
    };

    this.getPosts = function() {
        RequestService.getPosts(storedToken, function(response) {
            $scope.posts = response;

            // console.log($scope.posts);
            // this.date = $scope.posts.created.slice(0, 10);
            // this.time = $scope.posts.created.slice(11, 19);
            // $scope.posts.timeElapsed = this.date + ' ' + this.time;

            for (var index = 0; index < $scope.posts.length; index++) {
                $scope.posts[index].showMore = 3;
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
            // likedQuestions= StorageService.getLikedQuestion();
            // likedQuestionArray.push(likedQuestions);
            // self.getBlueLikes(likedQuestionArray);
        });
    };

    this.addResponse = function(comment, id) {
        this.newComment = {
            "karma_comment": comment,
            "karma_question_id": id
        };
        RequestService.postComment(this.newComment, storedToken);
        this.getPosts();
    };

    this.updateQuestionLikes = function(likes, id) {
        this.likes = {
            "question_like": likes,
        };
        RequestService.updateQuestionLikes(this.likes, id, storedToken, function(response) {
            self.getPosts();

        });
        // console.log(likedQuestionArray);
        // var newArray = likedQuestionArray.push(id);
        // console.log(newArray);
        // StorageService.setLikedQuestion(newArray);
    };

    this.updateCommentLikes = function(likes, id) {
        this.likes = {
            "comment_like": likes,
        };
        RequestService.updateCommentLikes(this.likes, id, storedToken, function(response) {
            self.getPosts();
            // likedCommentArray.push(id);
        });
        // StorageService.setLikedComment(likedCommentArray);
    };

    this.getDev = function() {
        RequestService.getDev(storedToken, storedId, function(response) {
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
        RequestService.getLeaderboard(storedToken, function(response) {
            $scope.leaderboard = response.all_developer_rankings;
            findUserStats($scope.leaderboard, 'developer_name', $scope.currentUser.username);

        });
    }

    // this.getBlueLikes = function(array) {
    //   console.log(array);
    //     console.log('hi');
    //     for (var index = 0; index < array.length; index++) {
    //       console.log(array);
    //       console.log('in blue loop');
    //       var blueId = array[index];
    //         for (var newIndex = 0; newIndex < $scope.posts.length; newIndex++) {
    //           console.log('in scope loop');
    //           var scopeId = $scope.posts[newIndex].question_id;
    //             if (scopeId === blueId) {
    //                 scopeId.liked = true;
    //             }
    //         }
    //       }
    //       $scope.$apply();
    // };

    this.getDev();
    this.getPosts();


});
