angular.module('codeKarmaApp').controller('CommunityFeedController', function($state, $scope, RequestService) {

    this.post = '';
    this.response = '';
    this.likes = 12;

    this.addPost = function() {
        console.log(this.post);
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
        $scope.currentUser = RequestService.createUser(response.data.info);
        console.log($scope.currentUser);
      });
    };

    this.getDev();
});
