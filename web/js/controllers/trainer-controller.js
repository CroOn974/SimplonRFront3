angular.module('simplonR').controller('TrainerController', ['$http', function ($http) {

  var store = this;

  store.users = [];

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

      $http.get('http://127.0.0.1:8000/api/users.json').success(function (data) {

          store.users = data;

      });

  };



  //Create Trainer



  store.createTrainer = function () {

      $http.post('http://127.0.0.1:8000/api/users.json', {

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


  function getTrainerupdate(id) {

  for (var i = 0; i < store.users.length; i++)

      if (store.users[i].id == id){

        return store.id[i];

      }

 };

 store.selectTrainer = function (id) {

    // change modal title
    //$('#modal-product-title').text("Edit applicant");
    store.createApplicant = 'Edit Applicant';

    // show udpate product button
    $('#btn-update-trainer').show();

    // show create product button
    $('#btn-create-trainer').hide();

    var trainer = getTrainerupdate(id);
    $http.get('http://127.0.0.1:8000/api/user.json', {
        'id': id
    }).success(function (data, status, headers, config) {        // put the values in form

      /*store.id = data[trainer]["id"];
      store.username = data[trainer]["username"];
      store.email = data[trainer]["email"];
      store.password = data[trainer]["password"];
      store.surname = data[trainer]["trainer"]["surname"];
      store.firstname = data[trainer]["trainer"]["firstname"];
      store.adress = data[trainer]["trainer"]["adress"];
      store.phone = data[trainer]["trainer"]["phone"];
      store.skills = data[trainer]["trainer"]["store.skills"];*/

        $('#modal-trainer-form').openModal();

    }).error(function (data, status, headers, config) {
        Materialize.toast('Unable to retrieve record.', 4000);
    });
};
    
    
    
}]);