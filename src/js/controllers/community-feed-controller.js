angular.module('codeKarmaApp').controller('CommunityFeedController', function($state, $scope, RequestService) {

    this.post = '';
    this.response = '';
    this.likes = 12;

    this.addPost = function() {
        console.log(this.post);

        this.newQuestion = {
          "karma_question": this.post
        };
        RequestService.postQuestion(this.newQuestion);

        this.post = '';
    };

    this.getPosts = function () {
      RequestService.getPosts(function(response) {
        $scope.posts = response[0];
        console.log($scope.posts);

        this.date = $scope.posts.created.slice(0, 10);
        this.time = $scope.posts.created.slice(11, 19);
        $scope.posts.timeElapsed = this.date + ' ' + this.time;
        console.log($scope.posts.timeElapsed);


      });

    };

    this.addResponse = function(response) {
      var newResponse = $('<p>').attr('class', 'response').html(response).appendTo('.responsesContainer');
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



    this.getDev();
    this.getPosts();
});
