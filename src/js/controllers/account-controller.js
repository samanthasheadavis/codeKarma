angular.module('codeKarmaApp').controller('AccountController', function($state, $location) {
  this.message = "in AccountController";
  this.url = $location.url();
  console.log(this.url);
});
