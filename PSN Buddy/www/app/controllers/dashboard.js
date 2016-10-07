define(['app', 'services/psnBuddyService'], function (app) {
  'use strict';

  app.controller('DashboardCtrl', ['$scope', 'PsnBuddyService', '$ionicSideMenuDelegate', '$ionicPlatform', '$ionicModal','$timeout', '$filter',
   function ($scope, PsnBuddyService, $ionicSideMenuDelegate, $ionicPlatform, $ionicModal,$timeout, $filter) {
	  $ionicModal.fromTemplateUrl('app/templates/qrcode/qrscanner-modal.html', {
		  scope: $scope,
		  animation: 'slide-in-up'
	  }).then(function(modal) {
		  $scope.modal = modal;
		  $scope.isScannerOpen = false;
	  });
	  $scope.$watchCollection('selectedCampus', function (newValue, oldValue, scope) {
		  if(newValue){
			  PsnBuddyService.getFacilities({campusId : newValue.id}).then(function(data){
				  console.log(data);
				  $scope.facilityList = data;
			  },function(err){
				  console.log(err);
			  });
		  }
	  });

	  navigator.geolocation.getCurrentPosition(function(position){
		  console.log(position)
		  PsnBuddyService.getCurrentCity(position).then(function(data){
			  PsnBuddyService.getCampusList({city: data.cityName, isArray: true}).then(function(data){
				  $scope.campusList = data;
				  console.log($scope.campusList);
				  $scope.selectedCampus = $filter('filter')($scope.campusList,{name: 'PSN'})[0];
				  console.log($scope.selectedCampus);
			  },function(err){
				  console.log(err);
			  });
		  }, function(err){
			  console.log(err);
		  });
	  }, function(err){
		  console.log(err)
	  });
	  // Cleanup the modal when we're done with it!
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  // Execute action on hide modal
	  $scope.$on('modal.hidden', function() {
		  $timeout(function(){
			  $scope.isScannerOpen = false;
		  },500);
	  });
	  // Execute action on remove modal
	  /*$scope.$on('modal.removed', function() {
	    // Execute action
	  });*/
      $scope.launchQrScanner = function (){
    	  if(!ionic.Platform.isWebView()){
    		  $scope.modal.show();
    		  $timeout(function(){
    			  $scope.isScannerOpen = true;    			  
    		  },1000);
    	  }else{
    		  cordova.plugins.barcodeScanner.scan(
			      function (result) {
			          alert("We got a barcode\n" +
			                "Result: " + result.text + "\n" +
			                "Format: " + result.format + "\n" +
			                "Cancelled: " + result.cancelled);
			      }, 
			      function (error) {
			          alert("Scanning failed: " + error);
			      }
		      );
    	  }
      };
  }]);
});
