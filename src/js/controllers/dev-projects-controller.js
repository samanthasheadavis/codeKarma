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
    };

    this.closeModal = function() {
      this.showModal = false;
      $('.dev-projects-container').removeClass('modal-up');
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
