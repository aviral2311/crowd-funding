/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .controller("AdminController", AdminController);

    function AdminController($location, $route, CategoryService, UserService,ProjectService) {
        var vm = this;
        vm.project={};
        vm.deleteUser = deleteUser;
        vm.deleteCategory = deleteCategory;
        vm.adminLogin = adminLogin;
        vm.register = register;
        vm.updateProject = updateProject;
        vm.addCategory = addCategory;
        vm.updateCategory = updateCategory;
        vm.addCause = addCause;
        vm.updateCause = updateCause;
        vm.deleteCause = deleteCause;
        
        
        
        function addCause(newCause){
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
        
        function deleteCause(Cause){
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
        
        function updateProject(project) {
            ProjectService
                .updateProject(project)
                .then(
                    function (response) {
                        vm.success = "Updated successfully";
                        $route.reload();
                    },
                    function (error) {
                        vm.error = "Unable to update project"
                    }
                );
        }

   
        
        function addCategory(category) {
            CategoryService
                .addCategory(category)
                .then(
                    function (response) {
                        var condition = response.data;
                        if (condition) {
                            vm.success = "Category Added successfully";
                            $route.reload();
                        }
                    },
                    function (err) {
                        vm.error = err.data;
                    }
                );

        }
        
        function updateCategory(category) {
        	CategoryService
                .updateCategory(user._id, user)
                .then(
                    function (response) {
                        vm.success = "Updated successfully";
                        $route.reload();
                    },
                    function (error) {
                        vm.error = "Unable to update user"
                    }
                );
        }
        
        function init() {
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

            CategoryService
                .getAllCategory()
                .then(
                    function (response) {
                        if (response.data) {
                            vm.ven = response.data;
                            vm.Categorys = [];
                            for (var i in vm.ven) {
                                getCategoryDetails(vm.ven[i].CategoryId);
                            }
                        } else {
                            vm.Categorys = [];
                        }
                    },
                    function (error) {
                        vm.Categorys = [];
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

        function adminLogin(adminUsername, adminPassword) {
            if (adminUsername === "admin" && adminPassword === "admin") {
                $location.url("/admin/login");
            } else {
                vm.error = "Invalid Credentials";
            }
        }

        function getCategoryDetails(CategoryId) {
            SearchService
                .findPlaceById(CategoryId)
                .then(
                    function (response) {
                        var CategoryDetails = response.data.response.Category;
                        vm.Categorys.push(CategoryDetails);
                    }
                )
        }



        function deleteCategory(CategoryId) {
            var confirmation = confirm("Are you sure to delete this Category ?");
            if (confirmation) {
                CategoryService
                    .deleteCategory(CategoryId)
                    .then(
                        function (res) {
                            $route.reload();
                            vm.deleteCategoryStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            vm.deleteCategoryStatus = false;
                        }
                    );
            }
        }


    }

})();
