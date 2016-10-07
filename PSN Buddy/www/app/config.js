define([
  'app'
], function (app) {
  'use strict';
  
  	app.config(['$ionicConfigProvider',function($ionicConfigProvider) {
	  //$ionicConfigProvider.views.transition('none');
	}]);
  
	app.controller('SideMenuCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate',function($scope, $rootScope, $ionicSideMenuDelegate){
		  $rootScope.menuItems = [{
			  				name:"Dash Board",url:"/dashboard"},
			  				{name:"Floor Map",url:"/floormap"},
			  				{name: "Find My Location", url: "/findmylocation"}];
		  
		  $rootScope.toggleLeft = function() {
	    	    $ionicSideMenuDelegate.toggleLeft();
		  };
	}]);
  // additional config-blocks
  // app.config([
  //   function () {
  //   }
  // ]);
});
