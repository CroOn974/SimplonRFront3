(function () {
'use strict';

    var app = angular.module('simplonR', []).config(function ($interpolateProvider) {
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
    
    

    /*app.config('RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080/gestionApprenant2/intFormateur.html/api');
        RestangularProvider.setRestangularFields({
            id: '@id'
        });
        RestangularProvider.setSelfLinkAbsoluteUrl(false);
        RestangularProvider.addResponseInterceptor(function (data, operation) {
            function populateHref(data) {
                if (data['@id'])
            }
        })
    });*/
    
    


    app.controller('ApprenantsController', ['$http', function ($http) {

        var store = this;
        store.products = [];


        //Fonctions controle modals

        store.showCreateForm = function () {
            // clear form
            store.clearForm();

            // change modal title
            //$('#modal-product-title').text("Create New Apprenant");
            store.createApplicant = 'Create new applicant';
            // hide update product button
            $('#btn-update-product').hide();

            // show create product button
            $('#btn-create-product').show();

        };

        store.clearForm = function () {
            store.surname = "";
            store.firstname = "";
            store.birth_date = "";
            store.birth_place = "";
            store.birth_country = "";
            store.adress = "";
            store.nationality = "";
            store.email = "";
            store.phone = "";
            store.codecademy_profile = "";
            store.english_level = "";
            store.last_diploma = "";
            store.pole_emploi_number = "";

        };
        //Fonctions CRUD

        store.getAll = function () {

            $http.get('http://127.0.0.1:8000/api/applicant/applicants.json').success(function (data) {

                store.products = data;

            });

        };

        store.createCandidat = function () {

            $http.post('http://127.0.0.1:8000/api/applicants/applicants.json', {
                'surname': store.surname,
                'firstname': store.firstname,
                'creation_date': moment().format(),
                'birth_date': moment(store.birth_date).format(),
                'birth_place': store.birth_place,
                'birth_country': store.birth_country,
                'adress': store.adress,
                'nationality': store.nationality,
                'email': store.email,
                'phone': store.phone,
                'codecademy_profile': store.codecademy_profile,
                'english_level': store.english_level,
                'last_diploma': store.last_diploma,
                'pole_emploi_number': store.pole_emploi_number,
                'status': "Candidat"
            }).success(function (data, status, header, config) {

                Materialize.toast("Le candidat "+ store.surname + "  " + store.firstname +" a bien été ajouté", 4000);


                // close modal
                $('#modal-product-form').closeModal();

                // clear modal content
                store.clearForm();

                // refresh the list
                store.getAll();
            });
        };

        store.deleteCandidat = function (id) {

            swal({
                title: "Are you sure?",
                text: "This applicant will be gone forever!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, mercy pls",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $http.delete('http://127.0.0.1:8000/api/applicants/' + id + '/applicant.json', {
                        'id': id
                    }).success(function (data, status, headers, config) {
                        // refresh the list
                        store.getAll();
                    });
                    swal("Deleted!", "Your applicant has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your applicant is safe", "error");
                }
            });

        };
        store.selectEdit = function (id) {
            // change modal title
            //$('#modal-product-title').text("Edit applicant");
            store.createApplicant = 'Edit Applicant';

            // show udpate product button
            $('#btn-update-product').show();

            // show create product button
            $('#btn-create-product').hide();
            var index = getSelectedIndex(id);
            $http.get('http://127.0.0.1:8000/api/applicant/applicants.json', {
                'id': id
            }).success(function (data, status, headers, config) {        // put the values in form


                store.id = data[index]["id"];
                store.surname = data[index]["surname"];
                store.firstname = data[index]["firstname"];
                store.birth_date = new Date(data[index]['birth_date']);
                store.birth_place = data[index]["birth_place"];
                store.birth_country = data[index]["birth_country"];
                store.adress = data[index]["adress"];
                store.nationality = data[index]["nationality"];
                store.email = data[index]["email"];
                store.phone = data[index]["phone"];
                store.codecademy_profile = data[index]["codecademy_profile"];
                store.english_level = data[index]["english_level"];
                store.last_diploma = data[index]["last_diploma"];
                store.pole_emploi_number = data[index]["pole_emploi_number"];
                store.status = data[index]['status'];

                $('#modal-product-form').openModal();

            }).error(function (data, status, headers, config) {
                Materialize.toast('Unable to retrieve record.', 4000);
            });
        };


        store.updateApprenant = function () {


            $http.put('http://127.0.0.1:8000/api/applicants/' + store.id + '/applicant.json', {
                'id': store.id,
                'surname': store.surname,
                'firstname': store.firstname,
                'birth_date': moment(store.birth_date).format(),
                'birth_place': store.birth_place,
                'birth_country': store.birth_country,
                'adress': store.adress,
                'nationality': store.nationality,
                'email': store.email,
                'phone': store.phone,
                'codecademy_profile': store.codecademy_profile,
                'english_level': store.english_level,
                'last_diploma': store.last_diploma,
                'pole_emploi_number': store.pole_emploi_number,
                'status': store.status

            }).success(function (data, status, headers, config) {

                Materialize.toast("Le candidat a bien été  modifié", 4000);

                // close modal
                $('#modal-product-form').closeModal();

                // clear modal content
                store.clearForm();

                // refresh the product list
                store.getAll();
            });
        };
        function getSelectedIndex(id) {
            for (var i = 0; i < store.products.length; i++)
                if (store.products[i].id == id)
                    return i;
            return -1;

        };


    }]);

    
    
    
    
    
    
    
    
    app.controller('AuthController', ['$http', '$window', function ($http,$window) {
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
    
    //---------------------------------------------------------------------------------------------------------------------------------

app.controller('TrainerController', ['$http', function ($http) {

  var store = this;

  store.trainer = [];

  //Fonctions controle modals

  store.showCreateForm = function () {

      // clear form

      store.clearForm();

      // change modal title

      //$('#modal-trainer-title').text("Create New Apprenant");

      store.createTrainer = 'Create new trainer';

      // hide update trainer button

      $('#btn-update-trainer').hide();

      // show create trainer button

      $('#btn-create-trainer').show();

  };

  store.clearForm = function () {

      store.surname = "";

      store.firstname = "";

      store.adress = "";

      store.phone = "";

      store.skill = "";

  };

  //Fonctions CRUD

  store.getAll = function () {

      $http.get('http://127.0.0.1:8000/api/trainer/trainers.json').success(function (data) {

          store.trainer = data;

      });

  };

  //Create Trainer

  

  store.createTrainer = function () {

      $http.post('http://127.0.0.1:8000/api/users/users.json', {

          'username': store.username,

          'email': store.email,

          'password': store.password,

          'trainer': {

            'surname': store.surname,

            'firstname': store.firstname,

            'adress': store.adress,

            'phone': store.phone,

            'skills': store.skill

          }

      }).success(function (data, status, header, config) {

          Materialize.toast(data, 4000);

          // close modal

          $('#modal-trainer-form').closeModal();

          // clear modal content

          store.clearForm();

          // refresh the list

          store.getAll();

      });

  };

  function getSelectedIndexByEmail(email) {

      for (var i = 0; i < store.trainer.length; i++)

          if (store.trainer[i].email == email){

            return store.id[i];

          }

  };

}]);
    
    
    



})();




