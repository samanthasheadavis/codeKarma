angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope, RequestService) {

this.toggleSlide = function() {
  $('header').slideToggle();
};



});
