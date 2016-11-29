angular.module('codeKarmaApp').controller('DevDashboardController', function($state, RequestService, $scope, $http) {

    this.devName = 'Your Name';
    this.devLink = 'github.com/yourName';
    var self = this;
    var storedToken = RequestService.getLocalToken();
    var storedId = RequestService.getLocalId();

    // have to edit in service to get correct url for posting skills
    this.getUrl = function() {
        this.url = RequestService.getDevUrl(storedToken, storedId);
    };

    this.updateInfo = function(value) {
        if ($scope.currentUser.skills.length === 0) {
            this.skills = {
                "skills": this.newSkill
            };
            RequestService.putSkills(storedToken, storedId, this.skills, function(response) {
              this.newSkill = '';
              self.getDev();
            });

        } else if ($scope.currentUser.skills.length > 0) {
            this.skills = {
                "skills": $scope.currentUser.skills + ', ' + this.newSkill
            };
            RequestService.putSkills(storedToken, storedId, this.skills, function(response) {
              this.newSkill = '';
              self.getDev();
            });

        }

        this.showLinkEdit = false;
        this.showNameEdit = false;
        this.showSkillEdit = false;


    };

    this.getDev = function() {
        RequestService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = RequestService.createUser(response.data);

            if ($scope.currentUser.skills.length === 0) {
              $scope.currentUser.skills = ' ';
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
        RequestService.getLeaderboard(storedToken, function(response) {
            $scope.leaderboard = response.all_developer_rankings;
            findUserStats($scope.leaderboard, 'developer_name', $scope.currentUser.username);

        });
    }

    this.getDev();
    this.getUrl();

});
