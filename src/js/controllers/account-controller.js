angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope) {

    this.views = function(view) {
        console.log('in');
        if (view === 'developer/all-projects' || view === 'developer/community-feed' || view === 'developer/dashboard' || view === 'developer/projects') {
            this.hideDev = true;
        } else if (view === 'client/dashboard' || view === 'client/projects' || view === 'client/add-project') {
            this.hideClient = true;
        } else if (view === 'home') {
            this.hideNav = true;
        } else if (view === 'all') {
            this.hideClient = false;
            this.hideDev = false;
        }
    };
});
