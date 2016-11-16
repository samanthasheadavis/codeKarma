angular.module('codeKarmaApp').controller('DevDashboardController', function($state) {

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

});
