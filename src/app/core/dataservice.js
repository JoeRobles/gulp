(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];
    
    /* @ngInject */
    function dataservice($http) {
        $http({method: 'get', url: 'app/db.json'});
        var service = {
            getSomething: getSomething,
            ready: ready
        };

        return service;
        
        function getSomething(){
            return;
        }
        function ready(){
            return;
        }
    }
})();