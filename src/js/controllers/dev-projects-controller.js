angular.module('codeKarmaApp').controller('DevProjectsController', function($scope, $state, RequestService) {

    $scope.progress = 0;

    // show pull request button when progress === 100%

    this.updateButton = function() {
      $('button.help-btn').removeClass('active');
      $('div.tooltip').addClass('active');
    };

    // remove pull request button when progress < 100%

    this.revertButton = function() {
      $('button.help-btn').addClass('active');
      $('div.tooltip').removeClass('active');
    };

    this.pullRequest = function() {
      $('.dev-projects-container').addClass('modal-up');
      this.showModal = true;

      this.token = RequestService.fetchToken();
      this.projectId = 2;
      this.branchUrl = "https://code-karma-api.herokuapp.com/branches/" + this.projectId + "?token=" + this.token;

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": this.branchUrl,
          "method": "GET"
      };

      $.ajax(settings).done(function(response) {
          $scope.headBranches = response.head_branches;
          $scope.baseBranches = response.base_branches;
          console.log($scope.baseBranches);
          console.log($scope.headBranches);

          $scope.$apply();
      });

    };

    this.closeModal = function() {
      this.showModal = false;
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

      this.requestUrl = "https://code-karma-api.herokuapp.com/developer_projects/" + this.projectId + "?token=" + this.token;

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": this.requestUrl,
          "method": "POST",
          "data": $scope.pullInfo
      };

      $.ajax(settings).done(function(response) {
        console.log(response);
      });

  };

    // get projects info

    this.getProjects = function() {
      RequestService.getDevProjects(function(response) {

          console.log(response);
          // $scope.projects = response;
          // console.log($scope.projects);
        });
    };

    // update and post progress

    $scope.updateProgress = function(progress, date, id) {
      console.log(id);

        this.status = {
          "percentage_complete": progress,
          "est_completion_date": date
        };

        RequestService.setProgress(this.status, id);

    };


    this.getProjects();

});
