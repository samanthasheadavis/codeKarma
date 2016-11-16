angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope) {

    this.refreshView = function() {
        this.url = $location.url();

        if (this.url === '/developer/all-projects' || this.url === '/developer/community-feed' || this.url === '/developer/dashboard' || this.url === '/developer/projects') {
            this.hideDev = true;
        } else if (this.url === '/client/dashboard' || this.url === '/client/projects' || this.url === '/client/add-project') {
            this.hideClient = true;
        } else if (this.url === '/') {
            this.hideNav = true;
        }
    };

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

    this.refreshView();
});
