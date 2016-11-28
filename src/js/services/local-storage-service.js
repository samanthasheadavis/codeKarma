angular.module('codeKarmaApp').service('StorageService', function($http, $location, $state, localStorageService) {


    function setLikedQuestion(question) {
        localStorageService.set('likedQuestion', question);
    }

    function getLikedQuestion() {
        return localStorageService.get('likedQuestion') || [];
    }

    function setLikedComment(comment) {
        localStorageService.set('likedComment', comment);
    }

    function getLikedComment() {
        return localStorageService.get('likedComment') || [];
    }



    return {
      getLikedQuestion: getLikedQuestion,
      setLikedQuestion: setLikedQuestion,
      getLikedComment: getLikedComment,
      setLikedComment: setLikedComment
    };

});
