(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function Dashboard($q, dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.name = 'Joe';
        console.log('dashboard joe');
    }
})();
