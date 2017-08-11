/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .controller("SettingsController", SettingsController);

    function SettingsController($location, $route, CategoryService, UserService,ProjectService,$window) {
        var vm = this;
        vm.project={};
        vm.addCause = addCause;
        vm.updateCause = updateCause;
        vm.removeCause = removeCause;
        vm.updatePassword = updatePassword;
        vm.cause ={};
        vm.check =0;
        vm.causeList=[];
        vm.projectList=[];
        vm.button ={};
        vm.checkProjectsInCause= checkProjectsInCause;
        var flag = false;
        var flag1= true;
        vm.pr={
        		uid: '',
        		oldPassword:'',
        		newPassword: ''
        
        }
        function updatePassword(){
        	var v = JSON.parse($window.localStorage.getItem('globals'));
        	vm.pr.uid=v.user_id;
        	UserService
        	.updatePassword(vm.pr)
        	.then(
        			function (response){
        				var cond = response.data;
        				if(cond){
        					$window.alert("password updated successfully");
        					$route.reload();
        				}
        				else{
        					$window.alert("password could not be updated due to any reason");
        				}
        			}, function(error){
        				$window.alert("password could not be updated");
        			}
        			);
        	
        }
        
        function checkProjectsInCause(cause){
        	angular.forEach(vm.projectList, function(value, key) {
        		console.log(cause.causeName);
        		console.log(value.cause.causeName);
        		if(cause.causeName ==  value.cause.causeName){
        			flag1 = false;
        		
        		}
        		
        	})
        	return flag1;
        }
        function addCause(){
        	angular.forEach(vm.causeList, function(value, key) {
        		if (vm.cause.causeName == value.causeName){
        			$window.alert("cause exists");
        			vm.message= "Improper Cause";
        			flag = true;
        			
        		}else{
        			vm.message= "";
        		}
        	})
        	if(flag==false){
        		var cause_id = Math.floor((Math.random()*100)+1);
        		console.log(cause_id);
        		console.log(vm.cause.causeName);
        	newCause = {
        			causeName: vm.cause.causeName,
        			causeId:cause_id ,	
        	}
        	CategoryService
        		.addCause(newCause)
        		.then(
        				function(response){
        					var condition = response.data;
        					if(condition){
        					vm.success = "cause added";
        					$route.reload();}
        					else{
        						$window.alert("something bad happened");
        						vm.error = "something bad happened";
        					}
        				},
        				function(error){
        					vm.error = "unabe to add cause";
        				}
        				);
        }
        }
        function updateCause(newCause){
        	CategoryService
        	.updateCause(newCause)
        	.then(
        			function(response){
        				var condition = response.data;
    					if(condition){
    					vm.success = "cause updated";
    					$route.reload();}
    					else{
    						$window.alert("something bad happened");
    						vm.error = "something bad happened";
    					}
    				},
    				function(error){
    					vm.error = "unabe to add cause";
    				}
        			);
        }
        
        function removeCause(Cause){
        	CategoryService
        	.deleteCause(Cause)
        	.then(
        			function(response){
        				var condition = response.data;
    					if(condition){
    					vm.success = "cause deleted";
    					$route.reload();}
    					else{
    						$window.alert("something bad happened");
    						vm.error = "something bad happened";
    					}
    				},
    				function(error){
    					vm.error = "unabe to delete cause";
    				
        			});
        }
        
       

   
        
        function init() {
           
        	var y = JSON.parse($window.localStorage.getItem('globals'));
        	if(y==null){
        		vm.check = 0;
        	}
        	else if(y.username =='admin1234'){
        		vm.check =1;
        	}
        	else{
        		vm.check =0;
        	}
             CategoryService
           	.getAllCauses()
           	.then(
           		function(response){
           			if(response.data){
           				vm.causeList = response.data;
           				console.log(vm.causeList);
           				angular.forEach(vm.causeList, function(value, key) {
           					vm.cause.causeName = value.causeName;
           					vm.cause.causeId = value.causeId;
           				})
           			}
           			else{
           				vm.causeList=[];
           			}
           			},
           			function(error){
           				vm.causeList=[];
           			}
           			);
             ProjectService
             	.getAllProject()
             	.then(
             		function(response) {
             			if(response.data){
             				vm.projectList = response.data;
             			}
             			else{
             				vm.projectList=[];
             			}
             		},
             		function(error){
             			vm.projectList=[];
             		})
             
        }

        init();


    }

})();
