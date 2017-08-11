/**
 * 
 */
(function () {
    angular
        .module("giveForCause")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            loggedIn: loggedIn,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            addNote: addNote,
            deleteNote: deleteNote,
            getUsers: getUsers,
            getAllUsernames:getAllUsernames,
            getProjectsCreatedByUser: getProjectsCreatedByUser,
            getDonationsByUser: getDonationsByUser,
            updatePassword :updatePassword
        };
        
        return api;
        
        function updatePassword(data){
        	return $http.put("http://localhost:8080/WhyThisFinalProject/rest/controller/user/password",data)
        }
        function getDonationsByUser(data){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/projectList/support/"+data);
        }
        function getProjectsCreatedByUser(data){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/projectList/creator/"+data);
        }
        function getAllUsernames(){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/usernames");
        }
        function getUsers() {
            return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/allusers");
        }
        function createUser(){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/usernames");
        }

        function addNote(userId, note) {
            var body = {
                userId: userId,
                note: note
            };
            return $http.put(APP_CONSTANT.REMOTE_HOST, body);
        }
        
        function deleteNote(userId, note) {
            var body = {
                userId: userId,
                note: note
            };
            return $http.put(APP_CONSTANT.REMOTE_HOST, body);
        }
        
        function register(user) {
        	console.log("Service"+user);
            return $http.post("http://localhost:8080/WhyThisFinalProject/rest/controller/user/add",user);
        }
        
        function loggedIn() {
            return $http.get(APP_CONSTANT.REMOTE_HOST);
        }
        
        function logout(user) {
            return $http.post(APP_CONSTANT.REMOTE_HOST);
        }
        
        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post(APP_CONSTANT.REMOTE_HOST, user);
        }
        
        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }
        
        function updateUser(newUser) {
            
            return $http.put("http://localhost:8080/WhyThisFinalProject/rest/controller/user/addProfile",newUser);
        }
        

        function findUserByUsername(username) {
            var url = APP_CONSTANT.REMOTE_HOST + username;
            return $http.get(url);
        }
        
        function findUserById(data) {
        
            var url = "http://localhost:8080/WhyThisFinalProject/rest/controller/user/"+data;
            return $http.get(url);
        }
        
        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }
        
          }

})();
        
        