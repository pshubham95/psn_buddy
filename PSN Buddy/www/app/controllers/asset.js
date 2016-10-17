define(['app', 'services/psnBuddyService'], function (app) {
  'use strict';

  app.controller('AssetCtrl', ['$scope','_','$stateParams', 'PsnBuddyService', '$ionicModal', '$rootScope', '$ionicListDelegate',
               function($scope, _, $stateParams, PsnBuddyService, $ionicModal, $rootScope, $ionicListDelegate){
	  console.log($stateParams);
	  PsnBuddyService.getAssets({campusId : parseInt($stateParams.campusId), facilityId: parseInt($stateParams.facilityId)}).then(function(data){
		  $scope.assets = data;
		  //$scope.facilityList = data;
	  },function(err){
		  console.log(err);
	  });
	  
	  $ionicModal.fromTemplateUrl('app/templates/qrcode/add-asset-modal.html', {
		  scope: $scope,
		  animation: 'slide-in-up'
	  }).then(function(modal) {
		  $scope.modal = modal;
		  $scope.isScannerOpen = false;
		  $scope.asset = {
				  			name: "", 
				  			isEnabled: false, 
				  			isAllocatedToEmp: false, 
				  			facilityId: parseInt($stateParams.facilityId),
				  			campusId: parseInt($stateParams.campusId)
				  		};
	  });
	  
	  $scope.showAddAssetModal = function(){
		  $scope.modal.show();
	  };
	  
	  $scope.resetAsset = function(){
		  $scope.asset.name = "";
		  $scope.asset.isEnabled = false;
		  $scope.asset.isAllocatedToEmp = false; 
	  };
	  
	  $scope.$on('modal.hidden', function() {
		  $scope.resetAsset();
	  });
	  
	  $scope.addAsset = function(addAssetForm){
		if(addAssetForm.$valid){
			PsnBuddyService.addAsset($scope.asset).then(function(response){
				$scope.assets = response.data; 
				console.log($scope.assets.length);
				$scope.resetAsset();
			},function(err){
				console.log(err);
			});
		}  
	  };
	  $scope.toggleAddToCart = function(asset){
		  asset.addToCart=!asset.addToCart;
		  if(asset.addToCart){
			  $rootScope.qrCart.push(asset);
		  }else{
			  var index = $rootScope.qrCart.indexOf(asset);
			  $rootScope.qrCart.splice(index, 1);    
		  }
	  };
	  $scope.toggleAssetEnable = function(asset){
		  asset.is_enabled = !asset.is_enabled;
		  $ionicListDelegate.closeOptionButtons();
		  asset.campusId = parseInt($stateParams.campusId);
		  PsnBuddyService.updateAsset(asset).then(function(response){
			  console.log(response);
		  },function(err){
			  console.log(err);
		  })
	  };
	  
	  $scope.checkIfItemAddedToCart = function(asset){
		 return _.filter($rootScope.qrCart, function(item) {
			    return item.id == asset.id;
			  }).length > 0;
	  }
	  
	  /*$scope.toggleGroup = function(group) {
		    if ($scope.isGroupShown(group)) {
		      $scope.shownGroup = null;
		    } else {
		      $scope.shownGroup = group;
		    }
		  };
		  $scope.isGroupShown = function(group) {
		    return $scope.shownGroup === group;
		  };
		  
		  PsnBuddyService.getFacilities({campusId : newValue.id}).then(function(data){
			  console.log(data);
			  $scope.facilityList = data;
		  },function(err){
			  console.log(err);
		  });*/
  
  }])
});