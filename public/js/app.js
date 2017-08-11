
/**
 * 
 */
// Step 1: declare modules
 angular.module("authModule",[]);
 angular.module("dashboardModule",[]);
 angular.module("personalModule",[]);
 angular.module("skillModule",[]);
 angular.module("projectModule",[]);
 angular.module("homeModule",[]);
 angular.module("registrationModule",[]);
 angular.module('giveForCause', [
	 'ngRoute',
     'ngCookies'
 ]);
//Step 2: Register App
var app = angular.module("app", 
		[
		'giveForCause',
		 'homeModule',
		 'authModule',
		 'dashboardModule',
		 'personalModule',
		 'skillModule',
		 'projectModule',
		 'registrationModule'
		 ]);