(function() {
    'use strict';

    angular.module('app.core', [
        'ngRoute',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        
    ]);
})();