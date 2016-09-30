define(['app', 'services/employeeFinderService'], 
       
function (app) {
  'use strict';
    
app.controller('empFinderCtrl', ['$scope', 'empFinderService', function($scope, empFinderService){    
     $scope.data={};
    
     $scope.doSearch = function(){
        
        var sso_selection = $scope.data.sso;
        var fn_selection = $scope.data.firstName;
        var ln_selection = $scope.data.lastName;
        
       // empFinderFactory.get(sso_selection,fn_selection,ln_selection);
    }
    
    
}])


});
               