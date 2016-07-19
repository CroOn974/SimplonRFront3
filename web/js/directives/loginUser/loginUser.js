(function () {
    'use strict';

    angular.module('simplonR').controller('LoginController', ['$http', '$window', function ($http,$window) {
        var ctrl = this;
        this.auth = auth;
        this.message = "";

        function auth(){

            $http
                .post('http://localhost:8000/login_check', "username="+ctrl.credentials.username+"&password="+ctrl.credentials.password,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    ctrl.message = 'Welcome';
                    store.getAll();
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;

                    // Handle login errors here
                    ctrl.message = 'Error: Invalid user or password';
                });
        };
    }]).
    directive('loginUser',function(){
        return{
            templateUrl: 'web/js/directives/loginUser/login.html',
            controller: 'LoginController',
            controllerAs: 'login',
            restrict: 'E'
        };
    });





})();




