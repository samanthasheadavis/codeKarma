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

  this.getUser = function() {

    RequestService.getUser(function(response) {

      console.log(response);

      this.currentDev = {

        username: response.data.info.nickname,
        name: response.data.info.name,
        email: response.data.info.email,
        image: response.data.info.image,
        github: response.data.info.urls.github

      };

      console.log(this.currentDev);

    });
  };

  this.getUser();

});
