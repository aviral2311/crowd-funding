/**
 * 
 */
 
var personalModule = angular.module('projectModule');
personalModule.controller('projectController', function($scope,$rootScope) {
	$scope.message = $rootScope.project;
});