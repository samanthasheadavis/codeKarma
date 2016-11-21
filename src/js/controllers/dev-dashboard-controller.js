angular.module('codeKarmaApp').controller('DevDashboardController', function($state, RequestService, $scope, $http) {

    this.devName = 'Your Name';
    this.devLink = 'github.com/yourName';

    // have to edit in service to get correct url for posting skills
    this.getUrl = function() {
        this.url = RequestService.getDevUrl();
    };

    this.updateInfo = function(value) {
      console.log('in updateInfo');
        if ($scope.currentUser.skills.length === 0) {
          console.log('in skills false');
            this.skills = [];
            this.skills.push(this.newSkill);
            $scope.currentUser.skills = this.skills;
            RequestService.postSkills($scope.currentUser.skills);
            this.newSkill = '';
        } else if ($scope.currentUser.skills.length > 0) {
          console.log('in skills true');
            $scope.currentUser.skills.push(this.newSkill);
            RequestService.putSkills($scope.currentUser.skills);
            this.newSkill = '';
        }

    this.showLinkEdit = false;
    this.showNameEdit = false;
    this.showSkillEdit = false;
};



this.getDev = function() {
    RequestService.getDev(function(response) {
        console.log(response);
        $scope.currentUser = RequestService.createUser(response.data);
    });
};

this.getDev();
this.getUrl();

});
