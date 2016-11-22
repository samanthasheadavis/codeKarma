angular.module('codeKarmaApp').controller('DevDashboardController', function($state, RequestService, $scope, $http) {

    this.devName = 'Your Name';
    this.devLink = 'github.com/yourName';

    // have to edit in service to get correct url for posting skills
    this.getUrl = function() {
        this.url = RequestService.getDevUrl();
    };

    this.updateInfo = function(value) {
        if ($scope.currentUser.skills.length === 0) {
            this.skills = {
                "skills": this.newSkill
            };
            RequestService.putSkills(this.skills);
            this.newSkill = '';
        } else if ($scope.currentUser.skills.length > 0) {
            this.skills = {
                "skills": $scope.currentUser.skills + ', ' + this.newSkill
            };
            RequestService.putSkills(this.skills);
            this.newSkill = '';
        }

        this.showLinkEdit = false;
        this.showNameEdit = false;
        this.showSkillEdit = false;
    };

    this.getDev = function() {
        RequestService.getDev(function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
        });
    };

    this.getDev();
    this.getUrl();

});
