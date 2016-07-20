 
angular.module('simplonR').controller('AuthController', ['$http', '$window', function ($http,$window) {
        var ctrl = this;
        this.auth = auth;
        this.logOut = logOut;
        this.message = "";

        if($window.sessionStorage.length == 0){
                    this.isAuth = false;


        }
        else{
            this.isAuth = true;

        }



        function auth(){

        $http
            .post('http://localhost:8000/login_check', "username="+ctrl.credentials.username+"&password="+ctrl.credentials.password,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                ctrl.message = 'Welcome';

                $window.location.reload();




            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;

                // Handle login errors here
                ctrl.message = 'Error: Invalid user or password';
                Materialize.toast("Identifiants invalides" , 4000);
            });
        };


        function logOut(){
             delete $window.sessionStorage.token;
             $window.location.reload();

        };
    }]);



