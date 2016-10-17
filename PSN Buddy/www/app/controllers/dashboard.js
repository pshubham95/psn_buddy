define(['app', 'services/psnBuddyService', 'services/dashboardService'], function (app) {
  'use strict';

  app.controller('DashboardCtrl', ['$scope','_', '$rootScope', 'PsnBuddyService', '$ionicSideMenuDelegate',
                                   '$ionicPlatform', '$ionicModal','$timeout', '$filter','$ionicPopup',
                                   '$window','DashboardService',
   function ($scope, _, $rootScope, PsnBuddyService, $ionicSideMenuDelegate, $ionicPlatform, $ionicModal,$timeout, $filter, $ionicPopup, $window, DashboardService) {
	  $rootScope.qrCart = [];
	  $rootScope.iscurrentUserTypeVisitor = true;
	  $ionicModal.fromTemplateUrl('app/templates/qrcode/qrscanner-modal.html', {
		  scope: $scope,
		  animation: 'slide-in-up'
	  }).then(function(modal) {
		  $scope.modal = modal;
		  $scope.isScannerOpen = false;
	  });
	  
	  $scope.$watch('iscurrentUserTypeVisitor', function(newVal, oldVal){
		  DashboardService.getDashboardOptions(!$rootScope.iscurrentUserTypeVisitor).then(function(response){
			  console.log(response)
			  $rootScope.menuItems = response;
			  $scope.cardOptions = _.filter($rootScope.menuItems,{'isVisibleAsCard': true}); 
		  }, function(err){
			  console.log(err);
		  });
	  })
	  
	  $scope.toggleUserType = function() {
		  $rootScope.iscurrentUserTypeVisitor = !$rootScope.iscurrentUserTypeVisitor;
	  }
	  
	  $scope.showChangeLocationPopUp = function(){
		  $scope.myPopup = $ionicPopup.show({
		    templateUrl: 'app/templates/qrcode/change-location-modal.html',
		    title: 'Change Location',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' }
		    ]
		  });
	  };
	  
	  
	  angular.element($window).bind('resize', function() {
		  $scope.$apply(function(){
			  $scope.windowHeightStyle = ($window.innerHeight/2)-100;
		  })
      })
	  
	  $scope.changeLocation = function(campus){
		  $rootScope.selectedCampus = campus;
		  $scope.myPopup.close();
	  };

	  navigator.geolocation.getCurrentPosition(function(position){
		  console.log(position)
		  PsnBuddyService.getCurrentCity(position).then(function(data){
			  $scope.getCityDetails(data);
		  }, function(err){
			  console.log(err);
		  });
	  }, function(err){
		  console.log(err);
		  $scope.getCityDetails();
	  });
	  
	  $scope.getCityDetails = function(data){
		  var promise = data ? PsnBuddyService.getCampusList({city: data.cityName}) : PsnBuddyService.getCampusList();
		  promise.then(function(data){
			  $scope.campusList = data;
			  console.log($scope.campusList);
			  $rootScope.selectedCampus = $filter('filter')($scope.campusList,{name: 'PSN'})[0];
			  console.log($scope.selectedCampus);
		  },function(err){
			  console.log(err);
		  });  
	  };
  }]);
});
