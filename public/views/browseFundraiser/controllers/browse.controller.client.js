/**
 * 
 */
(function () {
    angular
        .module("giveForCause")
        .controller("BrowseController", BrowseController);

    function BrowseController(ProjectService,UserService,CategoryService,$route,$location,$scope,$window) {
        var vm = this;
        $scope.filters ={};
        vm.check= 0;
        vm.projectDetail = projectDetail;
        vm.projectStatus= ['active', 'deactivated', 'completed'];
        vm.userTable= 0;
        vm.users= {};
        
        vm.changeTableStatus= function(data){
        	vm.userTable= data;
        };
        
	      function init() {
	    	  var user= JSON.parse($window.localStorage.getItem('globals'));
	    	  console.log('Browse User Check: '+user);
	    	  if(user==null){
	    		  vm.check =0; 
	    	  }
	    	  else if(user.username == 'admin1234'){
	    		  vm.check= 1;
	    	  }
	    	  else{
	    		  vm.check =0;
	    	  }
	             ProjectService
	             	.getAllProject()
	             	.then(
	             		function(response) {
	             			if(response.data){
	             				vm.projectList = response.data;
	             				console.log(vm.projectList);
	             			}
	             			else{
	             				vm.projectList=[];
	             			}
	             		},
	             		function(error){
	             			vm.projectList=[];
	             		})
	             CategoryService
	             	.getAllCategories()
	             	.then(
	             		function(response){
	             			if(response.data){
	             				vm.categoryList = response.data;
	             			}
	             			else{
	             				vm.categoryList=[];
	             			}
	             			},
	             			function(error){
	             				vm.categoryList=[];
	             			}
	             			)
	             CategoryService
	             	.getAllCauses()
	             	.then(
	             		function(response){
	             			if(response.data){
	             				vm.causeList = response.data;
	             			}
	             			else{
	             				vm.causeList=[];
	             			}
	             			},
	             			function(error){
	             				vm.causeList=[];
	             			}
	             			)
	             UserService
	                .getUsers()
	                .then(
	                    function (response) {
	                        if (response.data) {
	                            vm.users = response.data;
	                        } else {
	                            vm.users = [];
	                        }
	                    },
	                    function (error) {
	                        vm.users = [];
	                    }
	                )		
	        }

        init();
        
        function projectDetail(project){
        	$location.url('/project/' + project.projectId)
        }
        
        vm.calculateTotal= function (data){
        	console.log('Project: '+angular.toJson(data));
        	var totalDonations= 0;
        	angular.forEach(data.userDonationMapping, function(value, key) {
        		totalDonations= totalDonations + value.amountDonated;
        	});
        	return totalDonations;
        };
       
    }

})();