/**
 * 
 */
var dashboardModule = angular.module('dashboardModule');
dashboardModule.controller('dashboardController', function($scope, $rootScope,$location,dashboardService) {
	var dashboardCtrl = this;
	dashboardCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	

	
	dashboardCtrl.init = function(){
		
		console.log('init called')
		dashboardService.listProject($rootScope.userSession.id,null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			dashboardCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	dashboardCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.project = row.project;
		console.log($rootScope.project);
		$location.path('/project/view');

	};
	


});

dashboardModule.factory('dashboardService', function($http,$timeout,APP_CONSTANT) {
	var dashboardService = {};
	
	dashboardService.listProject = function (id,data, callback,callbackError) {
	
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = [
	     						{
	     							"name": "C",
	     							"desc": null
	     						},
	     						{
	     							"name": "C++",
	     							"desc": null
	     						}
	     					];
	     	
	
	         callback(response);
	     }, 1000);
		}else{
			
			 $http.get(
         			APP_CONSTANT.REMOTE_HOST+'/user/'+id+'/project'
         			).success(function (data, status, headers, config) {
    					callback(data);
        			})
        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
        					if(status== 422){
        						callbackError(data);
        					}
        			});
			
		}
	};
	
	
	return dashboardService;
});
