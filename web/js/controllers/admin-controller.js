angular.module('simplonR').controller('AdminController', ['$http', function ($http) {

  var store = this;

  store.admin = [];

  //Fonctions controle modals

  store.showCreateForm = function () {

      // clear form

      store.clearForm();

      // change modal title

      //$('#modal-trainer-title').text("Create New Apprenant");

      store.createAdmin = 'Create new admin';

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

  };

  //Fonctions CRUD
  //Create Trainer

  store.createAdmin = function () {

      $http.post('http://127.0.0.1:8000/api/users.json', {

          'username': store.username,

          'email': store.email,

          'password': store.password,

          'administrator': {

            'surname': store.surname,

            'firstname': store.firstname,

            'adress': store.adress,

            'phone': store.phone

          }

      }).success(function (data, status, header, config) {

          Materialize.toast(data, 4000);

          // close modal

          $('#modal-admin-form').closeModal();

          // clear modal content

          store.clearForm();

         

      });

  };


}]);