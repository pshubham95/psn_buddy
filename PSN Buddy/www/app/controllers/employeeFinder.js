define(['app', ['services/employeeFinderService','ngResource']], function (app) {
  'use strict';

app.controller('empFinderCtrl', function($scope){
    
     $scope.data={};
    
    $scope.doSearch = function(){
        
        var sso_selection =  $scope.data.sso;
        var fn_selection = $scope.data.firstName;
        var ln_selection = $scope.data.lastName;
        
        alert("sso_selection---------" +sso_selection +"--------fn_selection--------" +fn_selection + "-----------ln_selection---------" +ln_selection);
        
        
    }
    
    
})


});
               