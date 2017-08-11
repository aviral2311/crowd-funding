(function () {
    angular
        .module("giveForCause")
        .controller("LoginController", LoginController)

    function LoginController($location, AuthService,$rootScope,UserService, $window, AUTH_EVENTS) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.signup = 0;
        vm.signuptoggle=signuptoggle();
        function signuptoggle(){
        }
        function login() {
            if (vm.logindata.username === "" || vm.logindata.username == null) {
                vm.message= "Improper Username";
            } else if (vm.logindata.password === "" || vm.logindata.password == null ) {
                vm.message= "Improper Password";
            } else {
            	vm.message= "";
            	console.log("here"+vm.logindata);
                AuthService
                    .login(vm.logindata)
                    .then(function (response) {
                            var user = response.data;
                            if (user) {
                               vm.message = "Login Success";
                               console.log(vm.message +" "+angular.toJson(user, true));
                               $window.localStorage.setItem('globals', angular.toJson(user, true));
                               console.log('In Login Response: '+$window.localStorage.getItem('globals'));
                               $location.path('/browse');
                               } else {
                                vm.error = "Invalid Credentials";
                            }
                        },
                        function (error) {
                            vm.error = "Invalid Credentials"
                        });
            }
        }
        vm.logindata={
        			username:'',
        			password:''
        }
        vm.user={
        		email: '',
        		phone: '',
        		username: '',
        		password: '',
        		user_id: Math.floor((Math.random() * 100) + 1)
        }

    
        function init() {
        	
        	UserService
            	.getAllUsernames()
            	.then(
            		function(response) {
            			if(response.data){
            				vm.usernames = response.data;
            			}
            			else{
            				vm.usernames=[];
            			}
            		},
            		function(error){
            			vm.usernames=[];
            		})
        }
        init();
        function register() {
        	console.log(vm.user);
	        	if (vm.user.username === "" || vm.user.username == null || vm.usernames.includes(vm.user.username)) {
	                vm.message= "Improper Username";
	            } else if (vm.user.password === "" || vm.user.password == null) {
	                vm.message= "Improper Password";
	            }else if(vm.user.phone.length != 10){
	            	vm.message= "Improper Phone";
	            }
	            
	            else{
	            	vm.message= "";
	            	UserService
	                .register(vm.user)
	                .then(
	                    function (response) {
	                        var user = response.data;
	                        if (user) {
	                            $location.url("/login");
	                        }
	                    },
	                    function (err) {
	                        vm.error = err.data;
	                    }
	                );
	            }
                
            }
        }
    
})();