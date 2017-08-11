/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .controller("LogoutController", LogoutController)

    function LogoutController($location, AuthService,$rootScope,UserService, $window,$route) {
        var vm = this;
        vm.logout = logout;

        function logout() {
        console.log("status logout controller")
       	 authService.clearCredentials();
       	 console.log('....');
       	 $route.reload();

       }
    }
})();