/**
 * 
 */
var skillModule = angular.module('skillModule');
skillModule.controller('skillContoller', function($scope) {
	var skillCtrl = this;
	$scope.message = "This is skill";
	skillCtrl.message="This is fun";
	$scope.next = function(){
		
	};
})
