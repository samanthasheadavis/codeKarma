angular.module('codeKarmaApp').controller('CommunityFeedController', function($state, $scope, StorageService, CredentialsService, DevService) {

    this.post = '';
    this.response = '';
    var self = this;
    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();



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
        DevService.postQuestion(this.newQuestion, storedToken, function(response) {
            self.getPosts();
            self.getDev();
        });
        this.post = '';
    };

    this.getPosts = function() {
        DevService.getPosts(storedToken, function(response) {
            $scope.posts = response;
            for (var index = 0; index < $scope.posts.length; index++) {
                var newTime = moment($scope.posts[index].created).tz("UTC");
                $scope.posts[index].timeElapsed = moment(newTime, "YYYY-MM-DDTHH:mm:ss.SSSSZ").fromNow();
                $scope.posts[index].showMore = 3;
                if ($scope.posts[index].comments.length > 0) {
                    var currentPost = $scope.posts[index].comments;
                    for (var commIndex = 0; commIndex < currentPost.length; commIndex++) {
                        var newCommentTime = moment(currentPost[commIndex].created).tz("UTC");
                        currentPost[commIndex].commentTimestamp = moment(newCommentTime, "YYYY-MM-DDTHH:mm:ss.SSSSZ").fromNow();
                    }
                }
            }
            $scope.$apply();
            var likedQuestionArray = StorageService.getLikedQuestion();
            self.getBlueQuestions(likedQuestionArray);
        });
    };

    this.addResponse = function(comment, id) {
        this.newComment = {
            "karma_comment": comment,
            "karma_question_id": id
        };
        DevService.postComment(this.newComment, storedToken);
        this.getPosts();
        self.getDev();
    };

    this.updateQuestionLikes = function(likes, id) {
        likedQuestionArray = StorageService.getLikedQuestion();
        this.likes = {
            "question_like": likes,
        };
        DevService.updateQuestionLikes(this.likes, id, storedToken, function(response) {
            self.getPosts();
        });
        this.question = {
            questionId: id
        };
        likedQuestionArray.push(this.question);
        StorageService.setLikedQuestion(likedQuestionArray);
    };

    this.updateCommentLikes = function(likes, id) {
        likedCommentArray = StorageService.getLikedComment();
        this.likes = {
            "comment_like": likes,
        };
        this.comment = {
            commentId: id
        };
        DevService.updateCommentLikes(this.likes, id, storedToken, function(response) {
            self.getPosts();
        });
        likedCommentArray.push(this.comment);
        StorageService.setLikedComment(likedCommentArray);
    };

    this.getDev = function() {
        DevService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = CredentialsService.createUser(response.data);
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
        DevService.getLeaderboard(storedToken, function(response) {
            $scope.leaderboard = response.all_developer_rankings;
            findUserStats($scope.leaderboard, 'developer_name', $scope.currentUser.username);

        });
    }

    this.getBlueQuestions = function(array) {
        for (var index = 0; index < array.length; index++) {
            var blueId = array[index].questionId;
            for (var newIndex = 0; newIndex < $scope.posts.length; newIndex++) {
                self.getBlueComments($scope.posts[newIndex].comments);
                if ($scope.posts[newIndex].question_id === blueId) {
                    $scope.posts[newIndex].liked = true;
                }
            }
        }
        $scope.$apply();
    };

    this.getBlueComments = function(item) {
        likedCommentArray = StorageService.getLikedComment();
        for (var index = 0; index < likedCommentArray.length; index++) {
            var blueCommentId = likedCommentArray[index].commentId;
            for (var newIndex = 0; newIndex < item.length; newIndex++) {
                if (item[newIndex].id === blueCommentId) {
                    item[newIndex].liked = true;
                }
            }
        }
        $scope.$apply();
    };

    this.getDev();
    this.getPosts();

});
