angular.module('codeKarmaApp').controller('DevProjectsController', function($scope, $state, DevService, CredentialsService) {
    $scope.ownsProjects = true;
    var storedToken = CredentialsService.getLocalToken();
    var storedId = CredentialsService.getLocalId();

    // update Project progress on page when user drags slider

    function updateProjectProgress(progress, id) {
        for (var index = 0; index < $scope.projects.length; index++) {
            var project = $scope.projects[index];
            if (project.id == id) {
                project.progress = progress;
            }
        }
        $scope.$apply();
    }

    // show pull request button when progress === 100%

    this.updateButton = function(progress, id) {
        updateProjectProgress(progress, id);
        $('.' + id).toggleClass('active');
    };

    // remove pull request button when progress < 100%

    this.revertButton = function(progress, id) {
        updateProjectProgress(progress, id);
        $('button.help-btn' + '.' + id).addClass('active');
        $('button.update' + '.' + id).addClass('active');
        $('div.tooltip' + '.' + id).removeClass('active');
    };

    this.pullRequest = function(id) {
        $('.dev-projects-container').addClass('modal-up');
        $scope.showModal = true;
        this.projectId = id;
        DevService.pullRequest(storedToken, id, function(response) {
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
        DevService.submitRequest(storedToken, this.projectId, $scope.pullInfo, function(response) {
          $scope.showStatus = true;
          $scope.message = "Success! The client will be notified of your pull request.";
          $scope.error = false;
          $scope.newProjectBtn = false;
          $scope.$apply();
        }, function(response) {
          $scope.showStatus = true;
          $scope.error = true;
          $scope.message = "Oops! Looks like something went wrong. Check to make sure you're choosing the right branches and try again!";
          $scope.$apply();
        });
    };

    // get projects info

    this.getProjects = function() {
        DevService.getDevProjects(storedToken, storedId, function(response) {
            $scope.projects = response.my_developer_projects;
            if ($scope.projects.length === 0) {
                $scope.ownsProjects = false;
            } else {
                $scope.ownsProjects = true;
            }
            for (var i = 0; i < $scope.projects.length; i++) {
                var project = $scope.projects[i];
                var id = project.id;
                project.progress = project.percentage_complete;
                $('.flat-slider[data-id='+ id + ']').slider({
                  value: project.progress
                });
            }
            $scope.$apply();
        });
    };

    // update and post progress

    $scope.updateProgress = function(date, id) {
        var progress = $('.progress' + '.' + id).text();
        this.status = {
            "percentage_complete": progress,
            "est_completion_date": date
        };
        DevService.setProgress(storedToken, this.status, id);
        $scope.message = "Progress successfully updated.";
        $scope.showStatus = true;
        $scope.error = false;
        $scope.newProjectBtn = true;
    };

    this.getDev = function() {
        DevService.getDev(storedToken, storedId, function(response) {
            $scope.currentUser = CredentialsService.createUser(response.data);
        });
    };

    this.getDev();
    this.getProjects();

});
