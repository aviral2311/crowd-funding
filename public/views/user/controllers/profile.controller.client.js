/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .controller("ProfileController", ProfileController)

    function ProfileController($route, $rootScope, UserService, $location,$window) {
    	
    	var vm= this;
    	var pid = 
    	vm.user= {};
    	vm.projects= {};
    	vm.donations= {};
    	vm.tabs = 0;
        vm.updateProfile = updateProfile;
        vm.projectDetail =projectDetail;
        vm.editProjectDetail=editProjectDetail;
        vm.changeTab= function(tab){
        	console.log('Tab: '+tab+" :"+document.getElementById('p').classList);
        	if(tab == 0){
        		document.getElementById('p').classList.add("active");
        		document.getElementById('pro').classList.remove("active");
        		document.getElementById('dona').classList.remove("active");
        	}else if(tab == 1){
        		document.getElementById('pro').classList.add("active");
        		document.getElementById('p').classList.remove("active");
        		document.getElementById('dona').classList.remove("active");
        	}else{
        		document.getElementById('p').classList.remove("active");
        		document.getElementById('pro').classList.remove("active");
        		document.getElementById('dona').classList.add("active");
        	}
        	vm.tabs= tab;
        };
        function projectDetail(project){
        	$location.url('/project/'+project.projectId);

        }
        function editProjectDetail(project){
        	$location.url('/edit/'+project.projectId)

        }
        
        function init() {
        	vm.user= $window.localStorage.getItem('globals');
        	console.log("User: "+JSON.parse(vm.user).user_id);
            UserService
                .findUserById(JSON.parse(vm.user).user_id)
                .then(function (response) {
                	console.log("found user"+response.data);
                    vm.user = response.data;

                });
            UserService
            	.getProjectsCreatedByUser(JSON.parse(vm.user).user_id)
            	.then(function(response){
            		console.log("project List"+response.data);
            		vm.projects= response.data;
            	});
            UserService
            	.getDonationsByUser(JSON.parse(vm.user).user_id)
            	.then(function(response){
            		console.log("donated to: "+response.data);
            		vm.donations= response.data;
            	});
        };
        init();
        
        vm.calculateTotal= function (data){
        	console.log('Project: '+angular.toJson(data));
        	var totalDonations= 0;
        	angular.forEach(data.userDonationMapping, function(value, key) {
        		totalDonations= totalDonations + value.amountDonated;
        	});
        	return totalDonations;
        };
        vm.getUserDonationAmount= function(data){
        	var donation= 0;
        	angular.forEach(data.userDonationMapping, function(value, key) {
        		if(value.userProfile.user_id == vm.user.user_id){
        			donation= value.amountDonated;
        		}
        	});
        	return donation;
        };

        function updateProfile(){ 
        	console.log("updating user");
        	UserService
             .updateUser(vm.user)
             .then(
                     function (response) {
                    	 
                         vm.success = "Updated successfully";
                         console.log(vm.success);
                         $route.reload();
                     },
                     function (error) {
                         vm.error = "Unable to update user"
                     }
                 );
         }
    }
})();