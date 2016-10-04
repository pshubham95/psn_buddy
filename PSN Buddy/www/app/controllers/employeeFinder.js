define(['app', 'services/employeeFinderService'], 
       
function (app) {
  'use strict';
    
app.controller('empFinderCtrl', ['$scope','empFinderService','$ionicPopup','$http', function($scope, empFinderService,$ionicPopup,$http){    
    
     $scope.data={};
     $scope.showResult = false;
     $scope.empList = [];
    
    
     $scope.resetPrev = function(){
         $scope.showResult = false;
         $scope.empList = [];
         $scope.data={};
     }
    
     
     $scope.doSearch = function(){
        
        var sso_selection = $scope.data.sso;
        var fn_selection = $scope.data.firstName;
        var ln_selection = $scope.data.lastName;
             
        empFinderService.findEmployeeLocationDetails($http,sso_selection,fn_selection,ln_selection).success(function(result) {
               $scope.empList = result;
            });
         
         $scope.showResult = true;
     }
     

     
     $scope.showAlert = function(index) {
         
        $scope.selectedItem = angular.copy($scope.empList[index]);
      
        var alertPopup = $ionicPopup.alert({
        title: $scope.selectedItem.last_name+","+$scope.selectedItem.first_name,
        template: '<table>' +
            '<tr> <td> LastName : </td> <td>'+ $scope.selectedItem.last_name +'</td> </tr>' +
            '<tr> <td> FirstName : </td> <td>'+ $scope.selectedItem.first_name+ '</td> </tr>'+
            '<tr> <td> SSO : </td> <td>'+ $scope.selectedItem.sso +'</td> </tr>'+ 
            '<tr> <td> Floor : </td> <td>'+ $scope.selectedItem.floor+ '</td> </tr>'+ 
            '<tr> <td> Wing : </td> <td>'+ $scope.selectedItem.wings +'</td> </tr>'+ 
            '<tr> <td> Cubicle# : </td> <td>'+ $scope.selectedItem.cubicle_number+ '</td> </tr>'+
            '</table>',
       });
    };
}]);
    

});
               