define([
  'app'
], function (app) {
  'use strict';
	app.controller('SideMenuCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate',function($scope, $rootScope, $ionicSideMenuDelegate){
		  $scope.menuItems = [{
			  				name:"Dash Board",url:"/dashboard"},
			  				{name:"Floor Map",url:"/floormap"},
			  				{name: "Finy My Location", url: "/findmylocation"}];
		  
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
