angular.module('codeKarmaApp').controller('DevDashboardController', function($state, RequestService) {

  this.devName = 'Samantha Davis';
  this.devLink = 'github.com/yourName';
  this.skills = ['boiling water', 'napping'];

  this.updateInfo=function(value) {
    if (value === "skills") {
      this.skills.push(this.newSkill);
      this.newSkill = '';
    }

    this.showLinkEdit = false;
    this.showNameEdit = false;
    this.showSkillEdit = false;
  };

  this.getDev = function() {

    RequestService.getDev(function(response) {
      this.currentUser = RequestService.createUser(response.data.info);
      console.log(currentUser);
    });
  };

  this.getDev();


});
