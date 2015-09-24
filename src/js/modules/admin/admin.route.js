(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'js/modules/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'admin',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-admin"></i> Admin'
                    }
                }
            }
        ];
    }
})();
