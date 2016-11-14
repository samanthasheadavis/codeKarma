angular.module('codeKarmaApp').controller('HomeController', function($state) {
  this.message = "in HomeController";
  this.scrollAbout = function() {
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, 500);
};

});
