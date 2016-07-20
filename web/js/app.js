(function () {
'use strict';

    var app = angular.module('simplonR', [ ]).config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        $httpProvider.defaults.headers.delete = {};

    });
    
    
    
    
    
    app.directive('modalLogin', function(){
        return{
            restrict: 'E',
            templateUrl: 'web/js/directives/modals/modal-login.html'
        };
    });
    
    app.directive('modalApprenant', function(){
        return{
            restrict: 'E',
            templateUrl: 'web/js/directives/modals/modal-apprenant.html'
        };
    });

    app.directive('modalTrainer', function(){
        return{
            restrict: 'E',
            templateUrl: 'web/js/directives/modals/modal-trainer.html',
            
        };
    });  
    
    
    app.directive('modalAdmin', function(){
        return{
            restrict: 'E',
            templateUrl: 'web/js/directives/modals/modal-admin.html'
        };
    });
    
    
    
    app.factory('authInterceptor', function ($q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            }
        };
    });


})();
