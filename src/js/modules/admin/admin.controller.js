(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger'];
    /* @ngInject */
    function AdminController(logger) {
        logger.info('Activated Admin View');
        /*jshint validthis: true */
        var vm = this;

        vm.name = 'Hans';
        vm.title = 'Admin';
    }
})();