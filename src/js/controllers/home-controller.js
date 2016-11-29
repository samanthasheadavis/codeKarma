angular.module('codeKarmaApp').controller('HomeController', function($state) {
    this.message = "in HomeController";
    this.scrollAbout = function() {
        $('html, body').animate({
            scrollTop: $(".about").offset().top
        }, 500);
    };

    this.scrollMission = function() {
      $('html, body').animate({
          scrollTop: $(".mission").offset().top
      }, 500);
    };

    this.scrollTeam = function() {
      $('html, body').animate({
          scrollTop: $(".team").offset().top
      }, 500);
    };

    this.scrollMedia = function() {
      $('html, body').animate({
          scrollTop: $(".media").offset().top
      }, 500);
    };

    this.scrollTop = function() {
      $("html, body").animate({
          scrollTop: 0
      }, "slow");
      return false;
    };

});
