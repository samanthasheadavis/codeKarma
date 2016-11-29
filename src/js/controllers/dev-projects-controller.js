angular.module('codeKarmaApp').controller('DevProjectsController', function($scope, $state, RequestService) {
    $scope.ownsProjects = true;
    $scope.progress = 0;
    var storedToken = RequestService.getLocalToken();
    var storedId = RequestService.getLocalId();

    // show pull request button when progress === 100%

    this.updateButton = function(progress, id) {
      for (var index = 0; index < $scope.projects.length; index++) {
          if ($scope.projects[index].id === id ) {
              console.log('id ' + id);
              $scope.projects[index].progress = progress;
              console.log($scope.projects[index]);
          }
      }
      console.log(progress);
      $('.' + id).toggleClass('active');
    };

    // remove pull request button when progress < 100%

    this.revertButton = function(progress) {
      this.progress = progress;
      console.log(progress);
      $('button.help-btn, button.update').addClass('active');
      $('div.tooltip').removeClass('active');
    };

    this.pullRequest = function(id) {
      $('.dev-projects-container').addClass('modal-up');
      $scope.showModal = true;
      this.projectId = id;
      this.branchUrl = "https://code-karma-api.herokuapp.com/branches/" + this.projectId + "?token=" + storedToken;
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": this.branchUrl,
          "method": "GET"
      };

      $.ajax(settings).done(function(response) {
          $scope.headBranches = response.head_branches;
          $scope.baseBranches = response.base_branches;
          $scope.$apply();
      });
    };

    this.closeModal = function() {
      $scope.showModal = false;
      $('.dev-projects-container').removeClass('modal-up');
    };

    // get info from pull request form fields

    $scope.pullInfo = {
      title: '',
      body: '',
      head: '',
      base: ''
    };

    this.submitRequest = function() {
      this.closeModal();
      this.requestUrl = "https://code-karma-api.herokuapp.com/developer_projects/" + this.projectId + "?token=" + storedToken;
      console.log($scope.pullInfo);
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": this.requestUrl,
          "method": "POST",
          "data": $scope.pullInfo,
          "success": function(response) {
            console.log('success!');
            $scope.showStatus = true;
            $scope.message = "Success! The client will be notified of your pull request.";
            $scope.error = false;
            $scope.$apply();
          },
          "error": function(response) {
            $scope.showStatus = true;
            $scope.error = true;
            $scope.message = "Oops! Looks like something went wrong. Check to make sure you're choosing the right branches and try again!";
            $scope.$apply();
          }

      };
      $.ajax(settings).done(function(response) {
        
      });
  };

    // get projects info

    this.getProjects = function() {
      RequestService.getDevProjects(storedToken, storedId, function(response) {
          $scope.projects = response.my_developer_projects;
          if ($scope.projects.length === 0) {
            $scope.ownsProjects = false;
          } else {
            $scope.ownsProjects = true;
          }
          $scope.$apply();
        });
    };

    // update and post progress

    $scope.updateProgress = function(progress, date, id) {
      console.log(id);
        this.status = {
          "percentage_complete": progress,
          "est_completion_date": date
        };
        RequestService.setProgress(storedToken, this.status, id);
    };

    this.getDev = function() {
        RequestService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = RequestService.createUser(response.data);
        });
    };

    this.getDev();
    this.getProjects();

});
