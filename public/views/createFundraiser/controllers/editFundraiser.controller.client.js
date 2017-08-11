/**
 * 
 */
(function () {
    angular
        .module("giveForCause")
        .controller("EditFundraiserController", EditFundraiserController);

    function EditFundraiserController(ProjectService,CategoryService,$routeParams,$location,$window) {
        var vm = this;
        var pid = $routeParams.projectId;
        vm.userProfile =JSON.parse($window.localStorage.getItem('globals'));
        vm.projectRequest={};
        vm.causeList= {};
        
        vm.updateProject = updateProject;
       init();
        function init(){
        	ProjectService
         	.findProjectById(pid)
         	.then(
         		function(response) {
         			if(response.data){
         				vm.project = response.data;
         				console.log("Project Controller"+vm.project);
         			}
         			else{
         				vm.project=null;
         			}
         		},
         		function(error){
         			vm.error = "projectNotFound";
         		})
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
         		
        }
        
        function updateProject(project){
        	if(vm.userProfile!=null){
            	vm.projectRequest.projectId = pid;
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
        	.editProject(vm.projectRequest)
        	.then(
        			function(response){
        				if(response){
        					$window.alert("updated successfully")
        				}
        				else
        					{$window.alert("not updated")}
        			}, function (error){
        				{$window.alert("not updated")}
        			})
        		
        	}
           
        	}
        }
    }
    
})();