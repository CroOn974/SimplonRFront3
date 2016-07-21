angular.module('simplonR').controller('TrainerController', ['$http','$rootScope', function ($http,$rootScope) {

  var store = this;

  store.users = [];
  store.isAdmin = false;
    //écoute l'événement de quand on crée un trainer, puis rafraichit la liste
    $rootScope.$on('onTrainerCreate', function () {
             store.getAll();
        })
    
    store.request = function () {

      $http.get('http://127.0.0.1:8000/api/role.json').success(function (data) {

        if(data.length >= 2){
        store.isAdmin = true;
            
        }
        else {
            store.isAdmin = false; 
        }
          

      }).error(function (data) {
        
    });
        
    };

  //Fonctions controle modals

  store.showCreateForm = function () {

      // clear form

      store.clearForm();

      // change modal title

      //$('#modal-trainer-title').text("Create New Apprenant");

//      store.createTrainer = 'Create new trainer';

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



//  store.createTrainer = function () {
//
//      $http.post('http://127.0.0.1:8000/api/users.json', {
//
//          'username': store.username,
//
//          'email': store.email,
//
//          'password': store.password,
//
//          'trainer': {
//
//            'surname': store.surname,
//
//            'firstname': store.firstname,
//
//            'adress': store.adress,
//
//            'phone': store.phone,
//
//            'skills': store.skill
//
//          }
//
//      }).success(function (data, status, header, config) {
//
//          Materialize.toast(data, 4000);
//
//          // close modal
//
//          $('#modal-trainer-form').closeModal();
//
//          // clear modal content
//
//          store.clearForm();
//
//          // refresh the list
//
//          store.getAll();
//
//      });
//
//  };


  

//  function getTrainerupdate(id) {
//
//  for (var i = 0; i < store.users.length; i++)
//
//      if (store.users[i].id == id){
//
//        return i;
//
//      }
//
// };
//
// store.selectTrainer = function (id) {
//
//    // change modal title
//
//    //$('#modal-product-title').text("Edit applicant");
//
//    store.createApplicant = 'Edit Applicant';
//
//    // show udpate product button
//
//    $('#btn-update-trainer').show();
//
//    // show create product button
//
//    $('#btn-create-trainer').hide();
//
//    var user = getTrainerupdate(id);
//
//    $http.get('http://127.0.0.1:8000/api/users.json', {
//
//        'id': id
//
//    }).success(function (data, status, headers, config) {        // put the values in form
//
//      store.id = data[user]["id"];
//
//      store.username = data[user]["username"];
//
//      store.email = data[user]["email"];
//
//      store.password = data[user]["password"];
//
//      store.surname = data[user]["trainer"]["surname"];
//
//      store.firstname = data[user]["trainer"]["firstname"];
//
//      store.adress = data[user]["trainer"]["adress"];
//
//      store.phone = data[user]["trainer"]["phone"];
//
//      store.skill = data[user]["trainer"]["skills"];
//
//        $('#modal-trainer-form').openModal();
//
//    }).error(function (data, status, headers, config) {
//
//        Materialize.toast('Unable to retrieve record.', 4000);
//
//    });
//
//};
//
//    store.updateTrainer = function () {
//
//    $http.put('http://127.0.0.1:8000/api/users/' + store.id + '.json', {
//
//        'id': store.id,
//
//        'username': store.username,
//
//        'email': store.email,
//
//        'password': store.password,
//
//        'trainer': {
//
//          'surname': store.surname,
//
//          'firstname': store.firstname,
//
//          'adress': store.adress,
//
//          'phone': store.phone,
//
//          'skills': store.skill
//
//        }
//
//      }).success(function (data, status, headers, config) {
//
//        Materialize.toast("Le formateur a bien été  modifié", 4000);
//
//        // close modal
//
//        $('#modal-trainer-form').closeModal();
//
//        // clear modal content
//
//        store.clearForm();
//
//        // refresh the product list
//
//        store.getAll();
//
//      });
//
//};
    
    

store.deleteTrainer = function (id) {

    swal({

        title: "Are you sure?",

        text: "This trainer will be gone forever!",

        type: "warning",

        showCancelButton: true,

        confirmButtonColor: "#DD6B55",

        confirmButtonText: "Yes, delete it!",

        cancelButtonText: "No, mercy pls",

        closeOnConfirm: false,

        closeOnCancel: false

    }, function (isConfirm) {

        if (isConfirm) {

            $http.delete('http://127.0.0.1:8000/api/users/' + id + '.json', {

                'id': id

            }).success(function (data, status, headers, config) {

                // refresh the list

                store.getAll();

            });

            swal("Deleted!", "Your trainer has been deleted.", "success");

        } else {

            swal("Cancelled", "Your trainer is safe", "error");

        }

    });

};


    
    
    
}]);