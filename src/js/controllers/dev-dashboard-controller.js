angular.module('codeKarmaApp').controller('DevDashboardController', function($state, RequestService, $scope) {

  this.devName = 'Your Name';
  this.devLink = 'github.com/yourName';
  this.skills = ['boiling water', 'napping'];

  this.url = function() {
    this.url = RequestService.getDevUrl();
  };

  this.updateInfo=function(value) {
    if (value === "skills") {
      this.skills.push(this.newSkill);
      this.newSkill = '';
    }

    this.showLinkEdit = false;
    this.showNameEdit = false;
    this.showSkillEdit = false;

      $http ({
        method: "POST",
        url: this.url,
        data: this.skills
      }).then(function successCallback(response) {
        console.log(response);
      });
  };

  this.getDev = function() {

    RequestService.getDev(function(response) {
      $scope.currentUser = RequestService.createUser(response.data.info);
    });
  };

  this.getDev();
  this.url();

});
