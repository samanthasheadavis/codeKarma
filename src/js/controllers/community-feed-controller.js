angular.module('codeKarmaApp').controller('CommunityFeedController', function($state) {

    this.post = '';
    this.response = '';
    this.likes = 12;

    this.addPost = function() {
        console.log(this.post);
    };

    this.addResponse = function(response) {
      var newResponse = $('<p>').attr('class', 'response').html(response).appendTo('.responsesContainer');
      this.response = '';
    };

    this.updateLikes = function(likes) {
      console.log(likes);
      likes++;
      this.likes = likes;
    };
});
