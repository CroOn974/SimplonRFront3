



angular.module('simplonR').controller('ApprenantsController', ['$http', function ($http) {

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

            $http.get('http://127.0.0.1:8000/api/applicants.json').success(function (data) {

                store.products = data;

            });

        };

        store.createCandidat = function () {

            $http.post('http://127.0.0.1:8000/api/applicants.json', {
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
                    $http.delete('http://127.0.0.1:8000/api/applicants/' + id + '.json', {
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

            $http.get('http://127.0.0.1:8000/api/applicants.json', {
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


            $http.put('http://127.0.0.1:8000/api/applicants/' + store.id + '.json', {
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