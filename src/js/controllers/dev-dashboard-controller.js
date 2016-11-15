angular.module('codeKarmaApp').controller('DevDashboardController', function($state) {

  this.updateInfo=function(value) {
    console.log(value);
    this.showLinkEdit = false;
    this.showNameEdit = false;
  };

});
