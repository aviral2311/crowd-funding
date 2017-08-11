/**
 * 
 */

/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .controller("MainController", MainController);

    function MainController(ProjectService,$rootScope,$location,$window) {
        var vm = this;
        
	      function init() {
	    	  
	    	  ProjectService
	           	.getKpi()
	           	.then(
	           		function(response) {
	           			console.log("KPI: "+response.data);
	           			if(response.data){
	           				vm.hashtags = response.data;
	           				
	           			}
	           			else{
	           				vm.hashtags=[];
	           			}
	           		},
	           		function(error){
	           			vm.hashtags=[];
	           		});
	             ProjectService
	             	.getAllProject()
	             	.then(
	             		function(response) {
	             			console.log("Projects: "+response.data);
	             			if(response.data){
	             				vm.projectList = response.data;
	             			}
	             			else{
	             				vm.projectList=[];
	             			}
	             		},
	             		function(error){
	             			vm.projectList=[];
	             		});
	        }

        init();
        vm.showProject= function(data){
        	$location.path('/project/' + data);
        };
    }

})();
