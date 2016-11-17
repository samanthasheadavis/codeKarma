angular.module('codeKarmaApp').controller('AccountController', function($state, $location, $rootScope) {

// refreshView checks the url of the page after it is refreshed and adjusts the navbar items based on the url.
    this.refreshView = function() {
        this.url = $location.url();

        if (this.url === '/developer/all-projects' || this.url === '/developer/community-feed' ||  this.url === '/developer/projects') {
            this.hideDev = true;
        } else if (this.url === '/client/projects' || this.url === '/client/add-project') {
            this.hideClient = true;
        } else if (this.url === '/') {
            this.hideNav = true;
        } else if (this.url === '/developer/dashboard' || this.url === '/client/dashboard') {
            this.hideClient = true;
            this.hideDev = true;
        }
    };

// views adjusts the navbar items based on which navbar item is clicked on. If a user clicks on home, for instance, the navbar is hidden.
    this.views = function(view) {
        console.log('in');
        if (view === 'developer/all-projects' || view === 'developer/community-feed' || view === 'developer/projects') {
            this.hideDev = true;
        } else if (view === 'client/projects' || view === 'client/add-project') {
            this.hideClient = true;
        } else if (view === 'home') {
            this.hideNav = true;
        } else if (view === 'all') {
            this.hideClient = false;
            this.hideDev = false;
        } else if (view === '/client/dashboard' || view === '/developer/dashboard') {
            this.hideDev = true;
            this.hideClient = true;
        }
    };

    this.refreshView();
});
