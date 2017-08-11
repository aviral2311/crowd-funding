/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .config(configuration)
        .run(
	    function ($rootScope, $location, $window, $http, AUTH_EVENTS) {
	    	console.log(' Requested path '+$location.path());
	    	//Management 
	    	$rootScope.$on('$locationChangeStart', function (event, next, current) {
	            // redirect to login page if not logged in
	    		
	    		if($location.path() == '/logout'){
	 	 			$window.localStorage.removeItem('globals');
	 	 			console.log("Logout User Check: "+$rootScope.globals+" "+$window.localStorage.getItem('globals'));
	 	 			$rootScope.globals= null;
	 	 			$location.url('/');
			    }
			    else{
		    	var u= JSON.parse($window.localStorage.getItem('globals'));
		    	
			    console.log("Session User Check: "+u);
			    if(u && u!=null){
			    	console.log('Condition Satisfied');
	 	 			$('ul#guest').hide();
	 	 			$('ul#user').show();
	 	 			$('ul#admin').hide();
	 	 			if(u.username == 'admin1234'){
	 	 				console.log(u.username);
	 	 				$('ul#user').hide();
		 	 			$('ul#guest').hide();
	 	 				$('ul#admin').show();
	 	 			}
	 	 		}else{
	 	 			console.log('Guest');
	 	 			$('ul#user').hide();
	 	 			$('ul#guest').show();
	 	 			$('ul#admin').hide();
	 	 		}
	 	 		
			    }
	        });
	    	
			$rootScope.$on(AUTH_EVENTS.loginFailed, function(event, next){
		    		console.log('Login failed');
		        	 //$scope.message = "Login failed";
		    });
		
			$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, next){
				console.log('Logout Success');
				$window.localStorage.removeItem("globals");
				$rootScope.userSession=null;
				$rootScope.$emit("CallParentMethod", {});
				
			});
			
			$rootScope.$on(AUTH_EVENTS.notAuthorized, function(event, next){
				console.log('notAuthorized');
				$window.localStorage.removeItem("globals");
				$rootScope.userSession=null;
				$rootScope.$emit("CallParentMethod", {});
				
			});
	    
		    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, next){
				//$scope.message = "Login Success";
				console.log('Login success');
			    $window.localStorage.setItem("globals", angular.toJson($rootScope.globals));
			    //$rootScope.userSession=angular.toJson($rootScope.globals.userSession)
			    $rootScope.userSession = JSON.parse($window.localStorage.getItem("globals")).userSession;
			  
			    $rootScope.$emit("CallParentMethod", {});
				$location.path('/dashboard');
		    });
		    
		    //session management
		    
		    // keep user logged in after page refresh
		    

	})

    function configuration($routeProvider) {
        $routeProvider
            .when("/browse", {
                templateUrl: "views/browseFundraiser/templates/browse.view.client.html",
                controller: "BrowseController",
                controllerAs: "model"
            })
            .when("/", {
	            templateUrl: "views/main/templates/main.view.client.html",
	            controller: "MainController",
	            controllerAs: "model"
	        })
	         .when("/project/:projectId", {
	                templateUrl: "views/project/templates/project.view.client.html",
	                controller: "ProjectController",
	                controllerAs: "model"
	        })
	        .when("/create", {
	                templateUrl: "views/createFundraiser/templates/createFundraiser.view.client.html",
	                controller: "CreateFundraiserController",
	                controllerAs: "model"
	        })
	        .when("/login", {
	        		templateUrl: "views/user/templates/login.user.client.html",
	        		controller: "LoginController",
	        		controllerAs: "model"
	        })
	        .when("/profile", {
		    		templateUrl: "views/user/templates/profile.view.client.html",
		    		controller: "ProfileController",
		    		controllerAs: "model"
	        })
	        .when("/logout", {
	        	templateUrl: "views/main/templates/main.view.client.html",
	            controller: "MainController",
	            controllerAs: "model"
	        })
	        .when('/settings',{
	        	templateUrl: "views/main/templates/settings.view.client.html",
	            controller: "SettingsController",
	            controllerAs: "model"
	        })
	        .when('/edit/:projectId',{
	        	templateUrl: "views/createFundraiser/templates/editFundraiser.view.client.html",
	            controller: "EditFundraiserController",
	            controllerAs: "model"
	        });
    }
            })
            
            ();