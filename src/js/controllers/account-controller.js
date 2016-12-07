angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope) {

this.toggleSlide = function() {
  $('header').slideToggle();
};

});
