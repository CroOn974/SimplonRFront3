
(function() {


    
    
    var app = angular.module('simplonR', [ ]).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });
    
    app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        $httpProvider.defaults.headers.delete = {};
        
    });
    
     
    
    
    app.controller('ApprenantsController', ['$http', function($http){

        var store = this;
        store.products = [ ];
        
        
        
        
        //Fonctions controle modals
        
        store.showCreateForm = function(){
            // clear form
            store.clearForm();
     
            // change modal title
            $('#modal-product-title').text("Create New Apprenant");
     
            // hide update product button
            $('#btn-update-product').hide();
     
            // show create product button
            $('#btn-create-product').show();
     
        };
        
        store.clearForm = function(){
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
            
        }

        
        
        
        
        
        
        
        //Fonctions CRUD
        
        store.getAll= function(){
        
            $http.get('http://127.0.0.1:8000/applicant/applicants.json').success(function(data){

            store.products = data;

        });
            
        };
        
        
        
        
        
        
        store.createCandidat = function(){
            
            
          $http.post('http://127.0.0.1:8000/applicants/applicants.json', {
            'surname' : store.surname,
            'firstname' : store.firstname,
            'creation_date' : moment().format(),
            'birth_date' : moment(store.birth_date).format(),
            'birth_place' : store.birth_place,
            'birth_country' : store.birth_country,
            'adress' : store.adress,
            'nationality' : store.nationality,
            'email' : store.email,
            'phone' : store.phone,
            'codecademy_profile' : store.codecademy_profile,
            'english_level' : store.english_level,
            'last_diploma' : store.last_diploma,
            'pole_emploi_number' : store.pole_emploi_number,
            'status' : "Candidat",
            
            
            
        }).success(function(data, status, header, config){
              
              Materialize.toast(data, 4000);
         
              // close modal
              $('#modal-product-form').closeModal();
         
              // clear modal content
              store.clearForm();
         
              // refresh the list
              store.getAll();
        });  
            
        };
        
        
        
        
        store.deleteCandidat = function(id){
     
    
            
        
            $http.delete('http://127.0.0.1:8000/applicants/'+id+'/applicant.json', {
            'id' : id
        }).success(function (data, status, headers, config){
             
            
             
            // refresh the list
            store.getAll();
        });
    
        };
        
        
        store.selectEdit = function(id){   
            // change modal title
            $('#modal-product-title').text("Edit Apprenant");
     
            // show udpate product button
            $('#btn-update-product').show();
     
            // show create product button
            $('#btn-create-product').hide();
            
            
            $http.get('http://127.0.0.1:8000/applicant/applicants.json', {
       'id' : id
   }).success(function(data, status, headers, config){        // put the values in form

                
       store.id = data[0]["id"];     
       store.surname = data[0]["surname"];
       store.firstname = data[0]["firstname"];
       store.birth_place = data[0]["birth_place"];
       store.birth_country = data[0]["birth_country"];
       store.adress = data[0]["adress"];
       store.nationality = data[0]["nationality"];
       store.email = data[0]["email"];
       store.phone = data[0]["phone"];
       store.codecademy_profile = data[0]["codecademy_profile"];
       store.english_level = data[0]["english_level"];
       store.last_diploma = data[0]["last_diploma"];
       store.pole_emploi_number = data[0]["pole_emploi_number"];
            
        $('#modal-product-form').openModal();
            
            }).error(function(data, status, headers, config){
        Materialize.toast('Unable to retrieve record.', 4000);
    });
        }; 
        
        
        store.updateApprenant = function(){ 
            
            
            
            $http.put('http://127.0.0.1:8000/applicants/'+store.id+'/applicant.json', {
           'id' : store.id, 
           'surname' : store.surname,
           'firstname' : store.firstname,
           'birth_date' : moment().format(),
           'birth_place' : store.birth_place,
           'birth_country' : store.birth_country,
           'adress' : store.adress,
           'nationality' : store.nationality,
           'email' : store.email,
           'phone' : store.phone,
           'codecademy_profile' : store.codecademy_profile,
           'english_level' : store.english_level,
           'last_diploma' : store.last_diploma,
           'pole_emploi_number' : store.pole_emploi_number,
          
         }).success(function (data, status, headers, config){
           
            Materialize.toast(data, 4000);
         
            // close modal
            $('#modal-product-form').closeModal();
         
            // clear modal content
            $scope.clearForm();
         
            // refresh the product list
            $scope.getAll();
         });
 };
        
        
        
        
        

        
        

        
     
        
        
        function getSelectedIndex(id){
          for(var i=0; i<store.products.length;i++)
              if(store.products[i].id == id)
                  return i;
          return -1; 
            
        };


    }]);
    
   



})();




