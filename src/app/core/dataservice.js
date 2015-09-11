(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];
    
    /* @ngInject */
    function dataservice($http) {
        var service = {
            getSomething: getSomething,
            ready: ready
        };

        return service;
        
        ////////
        
        function getSomething(){
            return;
        }
        
        function ready(){
            return;
        }
    }
})();