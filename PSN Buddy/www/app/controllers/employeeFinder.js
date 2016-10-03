define(['app', 'services/employeeFinderService'], 
       
function (app) {
  'use strict';
    
app.controller('empFinderCtrl', ['$scope','empFinderService','$ionicPopup', function($scope, empFinderService,$ionicPopup){    
    
     $scope.data={};
     $scope.showResult = false;
     $scope.empList = [];
    
     $scope.doSearch = function(){
        
        var sso_selection = $scope.data.sso;
        var fn_selection = $scope.data.firstName;
        var ln_selection = $scope.data.lastName;
         
         $scope.empList = empFinderService.findEmployeeLocationDetails();
         $scope.showResult = true;
    }
     

     
     $scope.showAlert = function(index) {
         
        $scope.selectedItem = angular.copy($scope.empList[index]);
      
        var alertPopup = $ionicPopup.alert({
        title: $scope.selectedItem.lastName+","+$scope.selectedItem.firstName,
        template: '<table>' +
            '<tr> <td> LastName : </td> <td>'+ $scope.selectedItem.lastName +'</td> </tr>' +
            '<tr> <td> FirstName : </td> <td>'+ $scope.selectedItem.firstName+ '</td> </tr>'+
            '<tr> <td> SSO : </td> <td>'+ $scope.selectedItem.sso +'</td> </tr>'+ 
            '<tr> <td> Floor : </td> <td>'+ $scope.selectedItem.floor+ '</td> </tr>'+ 
            '<tr> <td> Wing : </td> <td>'+ $scope.selectedItem.wing +'</td> </tr>'+ 
            '<tr> <td> Cubicle# : </td> <td>'+ $scope.selectedItem.cubicle+ '</td> </tr>'+
            '</table>',
       });
    };
}]);
    

});
               