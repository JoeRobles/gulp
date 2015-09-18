(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['logger'];
    /* @ngInject */
    function DashboardController(logger) {
        logger.info('Activated Dashboard View');
        /*jshint validthis: true */
        var vm = this;

        vm.name = 'Joe';
    }
})();