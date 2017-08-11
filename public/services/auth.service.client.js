/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .factory("AuthService", AuthService);

    function AuthService($rootScope,$http,$timeout,$window) {
        var api = {
            login: login,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials,
        };
  
        return api;
        
        function login(data){
        	 var user = {
                     username: data.username,
                     password: data.password
                 };
        	 return $http.post("http://localhost:8080/WhyThisFinalProject/rest/controller/user/validate",user);
        }
        
        function setCredentials(data){

	         $rootScope.globals = {
	        		 					userSession: {
	         
						                    username: data.username,
						                    id:data.userId
	        		 					}
	         						};
	         $window.localStorage.globals= {
	        		 userSession:{
		                    username: data.username,
		                    id:data.userId
	 					}
	         };
	 	             
        }
        function clearCredentials(){
        	$window.localStorage.removeItem('globals');
	 		console.log("Logout User Check: "+$rootScope.globals+" "+$window.localStorage.getItem('globals'));
	 		$rootScope.globals= {};
        }
    }       
 })();       