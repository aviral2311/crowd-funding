/**
 * 
 */

(function () {
    angular
        .module("giveForCause")
        .factory("ProjectService", ProjectService);

    function ProjectService($http) {
        var api = {
            createProject: createProject,
            findProjectById: findProjectById,
            updateProject: updateProject,
            getAllProject: getAllProject,
            deleteProject: deleteProject,
            findSupportersofProject:findSupportersofProject,
            getAllDonations:getAllDonations,
            addDonation:addDonation,
            getKpi: getKpi,
            deactivateProject:deactivateProject,
            editProject:editProject
        };
        
        return api;
        function getKpi(){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/getKpi");
        	/*.success(function(data, status, headers, config) {
        		console.log("Success: "+data);
        		return data;
        	})
        	.error(function(data, status, headers, config) {
        		console.log("Error");
        		return "Error";
        	});*/
        }
        function editProject(project){
        	return $http.put("http://localhost:8080/WhyThisFinalProject/rest/controller/edit/project",project);

        }
        function deactivateProject(project){
        	return $http.put("http://localhost:8080/WhyThisFinalProject/rest/controller/deactivate/project",project);

        }
        function addDonation(data){
        	return $http.post("http://localhost:8080/WhyThisFinalProject/rest/controller/donation/add",data);
        }
        function deleteProject(ProjectId) {
            return $http.delete(APP_CONSTANT.REMOTE_HOST + ProjectId);
        }
        
        function getAllProject() {
            return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/projectList");
        }
        
        function updateProject(Project) {
            return $http.put("http://localhost:8080/WhyThisFinalProject/rest/controller/update/project",Project);
        }

        function findProjectById(ProjectId) {
            return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/project/"+ProjectId);
        }

        function createProject(Project) {
            return $http.post("http://localhost:8080/WhyThisFinalProject/rest/controller/project/add",Project);
        }
        function findSupportersofProject(projectId){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/project/users/"+projectId)
        }
        function getAllDonations(pid){
        	return $http.get("http://localhost:8080/WhyThisFinalProject/rest/controller/project/donation/"+pid)
        }
        
        
     }

})();