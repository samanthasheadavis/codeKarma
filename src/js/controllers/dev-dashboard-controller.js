angular.module('codeKarmaApp').controller('DevDashboardController', function($state, $scope, $http, DevService, CredentialsService) {

    this.devName = 'Your Name';
    this.devLink = 'github.com/yourName';
    var self = this;
    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

    // have to edit in service to get correct url for posting skills
    this.getUrl = function() {
        this.url = DevService.getDevUrl(storedToken, storedId);
    };

    this.updateInfo = function(value) {
        if ($scope.currentUser.skills.length === 0) {
            this.skills = {
                "skills": this.newSkill
            };
            DevService.putSkills(storedToken, storedId, this.skills, function(response) {
              self.getDev();
            });

            this.newSkill = '';

        } else if ($scope.currentUser.skills.length > 0) {
            this.skills = {
                "skills": $scope.currentUser.skills + ', ' + this.newSkill
            };
            DevService.putSkills(storedToken, storedId, this.skills, function(response) {
              self.getDev();
            });

            this.newSkill = '';
        }

        this.showLinkEdit = false;
        this.showNameEdit = false;
        this.showSkillEdit = false;


    };

    this.getDev = function() {
        DevService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = CredentialsService.createUser(response.data);

            if ($scope.currentUser.skills.length === 0) {
              $scope.currentUser.skills = '';
            }
            getLeaderboard();
        });
    };

    function findUserStats(array, attr, value) {
        for (var index = 0; index < array.length; index += 1) {
            if (array[index][attr] === value) {
              $scope.currentUserStats = {
                username: $scope.leaderboard[index].developer_name,
                points: $scope.leaderboard[index].karma_points,
                total_devs: $scope.leaderboard[index].total_developers,
                rank: $scope.leaderboard[index].developer_rank
              };
              $scope.$apply();
            }
        }
        return -1;
    }

    function getLeaderboard() {
        DevService.getLeaderboard(storedToken, function(response) {
            $scope.leaderboard = response.all_developer_rankings;
            findUserStats($scope.leaderboard, 'developer_name', $scope.currentUser.username);

        });
    }

    this.getDev();
    this.getUrl();

});
