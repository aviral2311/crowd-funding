/**
 * 
 */
(function () {
    angular
        .module("giveForCause")
        .controller("ProjectController", ProjectController);

    function ProjectController(ProjectService,$routeParams,$location,$window,$route) {
        var vm = this;
        var pid = $routeParams.projectId;
        var numOfSupporters = {};
        var amountdonated= 0;
        var goal = 0;
        vm.donate = donate;
        vm.checkUser = checkUser;
        vm.deactivateProject = deactivateProject;
        var donationBean = {};
        vm.checkAdmin = checkAdmin;
        vm.project={
        		projectId : "",
        		creatorId : "",
        		creatorName : "",
        		title : "",
        		endDate : "",
        		goal : "",
        		categories : "",
        		description : "",
        		cause : "",
        		story : "",
        		status :"",
        		reasonForStatus :"",
        		userDonationMapping : ""
        };
        function checkAdmin(){
        	var admin = JSON.parse($window.localStorage.getItem('globals'));
        	console.log(admin.username);
        	if(admin.username=="admin1234"){
        		return true;
        	}
        	return false;
        }
        function checkUser(){
        	var user_creator = $window.localStorage.getItem('globals');
        	if(user_creator==null){
        		return false;
        	}
        	var username_creator = JSON.parse(user_creator).username;
        	if(vm.project.creatorName == username_creator){
        		return true;
        	}
        	return false;
        }
        function deactivateProject(){
        	vm.project.status ='deactivated';
        	ProjectService
        		.updateProject(vm.project)
        		.then(
        				function(response){
        					if(response){
        						vm.message = 'updated successfully';
        						$window.alert("updated successfully");
        					}
        					else{
        						vm.message ='error';
        					}
        				})
        }
        vm.donationCheck= function(){
	  		if(vm.project.goal == vm.totalRaised)
	  			return false;
	  		else
	  			return true;
        }	
	      function init() {
	    	  vm.pid = pid;
	    	  	console.log("Project ID: "+pid);
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
	             		
	             ProjectService
	             .findSupportersofProject(pid)
	             .then(
	            		 function(response){
	            			 if (response.data){
	            				 vm.userList = response.data;
	            				 console.log(vm.userList);
	            				 numOfSupporters = vm.userList.length;
	            				 vm.numOfSupporters = numOfSupporters;
	            			 }
	            			 else{
	            				 vm.userList = null;
	            			 }
	            		 },
	            		 function(error){
	            			 vm.error="usernotfetched";
	            		 
	            		 })
	            		 
	            ProjectService
	            .getAllDonations(pid)
	            .then(
	            		function(response){
	            			if (response.data){
	            				vm.donationList = response.data;
		            			console.log(vm.donationList);
		            			angular.forEach(vm.donationList, function(value, key) {
		            				amountdonated += value.amountDonated;
		            			})
		            			console.log(amountdonated);
		            			vm.totalRaisedinPercent = Math.round((amountdonated/vm.project.goal)*100);
		            			if(amountdonated == 0){
		            				vm.totalRaisedinPercent= 0;
		            			}
		            			console.log(vm.totalRaisedinPercent);
		            			//if goal is complete status changes to completed
		            			vm.totalRaised = amountdonated;
	            			}
	            		else{
	            			vm.donationList = null;
	            		}
	            		},
	            		function(error){
	            			vm.error ="donationnotfetched";
	            		})
	            	
	         vm.donationCheck= function(){
		    	  		if(vm.project.goal == vm.totalRaised)
		    	  			return false;
		    	  		else
		    	  			return true;
		    	};	
	             	
	        }

        init();
        
        function donate(){
		    var u= JSON.parse($window.localStorage.getItem('globals'));
		    if(u){
        	var donationId = Math.floor((Math.random() * 100) + 1);
        	donationBean.donationId = donationId;
        	donationBean.projectId = pid;
        	donationBean.userId = u.user_id;
        	donationBean.amountDonated = vm.amount;
        	
        	ProjectService
        		.addDonation(donationBean)
        		.then(
        				function (response){
        					var condition = response.data;
        					if (condition){
        						$window.alert("Successfully Donated Money");
        						$route.reload();

        					}
        					else{
        						$window.alert("Sonething is not right");

        					}
        				},function(error){
    						$window.alert("Something is very bad");

        				})
        			
        	}
		    else{
		    	$window.alert("Please login");
		    }
        }
   
        function deactivateProject(){
        	ProjectService
    		.deactivateProject(vm.project)
    		.then(
    				function(response){
    					if(response){
    						
    						vm.message = 'updated successfully';
    						$window.alert("updated successfully");
    					}
    					else{
    						vm.message ='error';
    					}
    				})
        	
        }
       
    }

})();