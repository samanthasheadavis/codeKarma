(function($) {
  "use strict";

  var codeKarmaApp = angular.module('codeKarmaApp', ['ui.router']);

  codeKarmaApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('codeKarmaParent', {
          url: '/',
          abstract: true,
          template: '<ui-view></ui-view>'
      }).state('codeKarmaParent.home', {
          url: '',
          controller: 'HomeController as home',
          templateUrl: 'src/templates/home.html'
      }).state('codeKarmaParent.allProjects', {
          url: 'developer/all-projects',
          controller: 'AllProjectsController as allProjects',
          templateUrl: 'src/templates/all-projects.html'
      }).state('codeKarmaParent.clientDashboard', {
          url: 'client/dashboard',
          controller: 'ClientDashboardController as clientDashboard',
          templateUrl: 'src/templates/client-dashboard.html'
      }).state('codeKarmaParent.clientAddProject', {
          url: 'client/add-project',
          controller: 'ClientAddProjectsController as clientAddProject',
          templateUrl: 'src/templates/client-add-project.html'
      }).state('codeKarmaParent.clientProjects', {
          url: 'client/projects',
          controller: 'ClientProjectsController as clientProjects',
          templateUrl: 'src/templates/client-projects.html'
      }).state('codeKarmaParent.communityFeed', {
          url: 'developer/community-feed',
          controller: 'CommunityFeedController as communityFeed',
          templateUrl: 'src/templates/community-feed.html'
      }).state('codeKarmaParent.devDashboard', {
          url: 'developer/dashboard',
          controller: 'DevDashboardController as devDashboard',
          templateUrl: 'src/templates/dev-dashboard.html'
      }).state('codeKarmaParent.devProjects', {
          url: 'developer/projects',
          controller: 'DevProjectsController as devProjects',
          templateUrl: 'src/templates/dev-projects.html'
      });

    });

})(jQuery);
