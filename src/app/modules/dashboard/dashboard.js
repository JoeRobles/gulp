(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function Dashboard($q, dataservice, logger) {
        logger.info('Activated dashboard View');
        /*jshint validthis: true */
        var vm = this;

        vm.name = 'Joe';
    }
})();