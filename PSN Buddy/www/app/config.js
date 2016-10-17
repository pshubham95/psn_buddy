define([
  'app'
], function (app) {
  'use strict';
  
  	app.config(['$ionicConfigProvider',function($ionicConfigProvider) {
	  //$ionicConfigProvider.views.transition('none');
	}]);
  
	app.controller('SideMenuCtrl', ['$scope', '$rootScope', '$ionicSideMenuDelegate',function($scope, $rootScope, $ionicSideMenuDelegate){
		  $rootScope.menuItems = [];
		  
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
