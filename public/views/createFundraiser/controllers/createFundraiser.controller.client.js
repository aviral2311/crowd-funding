/**
 * 
 */
(function () {
    angular
        .module("giveForCause")
        .controller("CreateFundraiserController", CreateFundraiserController);

    function CreateFundraiserController(ProjectService,CategoryService,$route,$location,$window) {
        var vm = this;
        vm.createProject = createProject;
        vm.projectRequest={};
        vm.userProfile =JSON.parse($window.localStorage.getItem('globals'));
        vm.projectCause = {};
        vm.causeList= {};
        
        function createProject(project) {
        	if(vm.userProfile!=null){
        	vm.projectRequest.projectId = Math.floor((Math.random() * 100) + 1);
        	vm.projectRequest.userProfile = vm.userProfile;
        	vm.projectRequest.title = project.title;
        	vm.projectRequest.description = project.description;
        	vm.projectRequest.endDate = project.endDate;
        	angular.forEach(vm.causeList, function(value, key) {
        		if(value.causeId==project.cause){
        			vm.projectRequest.cause	= value;
        		}
        	});
        	vm.projectRequest.story	= project.story;
        	vm.projectRequest.goal	= project.goal;
        	console.log('Created Project: '+vm.projectRequest);
        	if(vm.projectRequest.userProfile == null){
        		vm.message= "No User Found";
        	
        	}else{
        		vm.message= "";
        		ProjectService
                .createProject(vm.projectRequest)
                .then(
                    function (response) {
                        var condition = response.data;
                        if (condition) {
                            vm.success = "Project Added successfully";
                            $route.reload();
                        }
                    },
                    function (err) {
                        vm.error = err.data;
                    }
                );
        	}
        	}else{
        		$window.alert("please login");
        	}
        }
	      function init() {
	    	  vm.userProfile =JSON.parse($window.localStorage.getItem('globals'));
	             console.log(vm.userProfile);
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
           			);
	        };

        init();

       
    }

})();/**
 * 
 */