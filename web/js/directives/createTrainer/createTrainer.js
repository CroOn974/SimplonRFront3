(function () {

    angular.module('simplonR').directive('modalCreateTrainer', function () {
            return {
                restrict: 'E'
                , templateUrl: 'web/js/directives/createTrainer/modal-create-trainer.html'
                , controller: 'CreateTrainerController'
                , controllerAs: 'createTrainerCtrl'
                , link: function (scope, element, attrs) {
                    scope.$root.$on('onTrainerCreate', 'onTrainerUpdate', function () {
                        $('#modal-trainer-form').closeModal();
                    });
                }

            };
        })
        .controller('CreateTrainerController', ['$http', '$rootScope', function ($http, $rootScope) {

            var store = this;

            store.users = [];
            store.isAdmin = false;

            store.clearForm = function () {

                store.surname = "";

                store.firstname = "";

                store.adress = "";

                store.phone = "";

                store.skill = "";

            };

            //Create Trainer
            store.createTrainer = function () {

                $http.post('http://127.0.0.1:8000/api/users.json', {
                    'username': store.username
                    , 'email': store.email
                    , 'password': store.password
                    , 'trainer': {
                        'surname': store.surname
                        , 'firstname': store.firstname
                        , 'adress': store.adress
                        , 'phone': store.phone
                        , 'skills': store.skill
                    }

                }).success(function (data, status, header, config) {

                    Materialize.toast(data, 4000);
                    // clear modal content

                    store.clearForm();
                    //émet un évenement vers toute l'application (broadcast) pour dire qu'on a créé un trainer
                    $rootScope.$broadcast('onTrainerCreate');

                });

            };

            function getTrainerupdate(id) {

                for (var i = 0; i < store.users.length; i++)

                    if (store.users[i].id == id) {

                        return i;

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

                var user = getTrainerupdate(id);

                $http.get('http://127.0.0.1:8000/api/users.json', {

                    'id': id

                }).success(function (data, status, headers, config) { // put the values in form

                    store.id = data[user]["id"];

                    store.username = data[user]["username"];

                    store.email = data[user]["email"];

                    store.password = data[user]["password"];

                    store.surname = data[user]["trainer"]["surname"];

                    store.firstname = data[user]["trainer"]["firstname"];

                    store.adress = data[user]["trainer"]["adress"];

                    store.phone = data[user]["trainer"]["phone"];

                    store.skill = data[user]["trainer"]["skills"];

                    $('#modal-trainer-form').openModal();

                }).error(function (data, status, headers, config) {

                    Materialize.toast('Unable to retrieve record.', 4000);

                });

            };

            store.updateTrainer = function () {

                $http.put('http://127.0.0.1:8000/api/users/' + store.id + '.json', {

                    'id': store.id,

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

                }).success(function (data, status, headers, config) {

                    Materialize.toast("Le formateur a bien été  modifié", 4000);

                    // close modal

                    $rootScope.$broadcast('onTrainerUpdate');

                    // clear modal content

                    store.clearForm();

                    // refresh the product list

                    store.getAll();

                });

            };
}]);

})();