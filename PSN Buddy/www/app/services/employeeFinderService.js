define([
  'app'
], function (app) {
  'use strict';    
  
    app.service('empFinderService',[
       function ($scope) {
           
           this.findEmployeeLocationDetails = function($scope){
             
            //testing start
             var employeeList = [];
             var i = 0;
             var firstName = "Shruthi", lastName = "", sso = "";
             var floor = "", wing = "", cubicleDetails = "";
             
             for(i = 0; i <8; i++){
                 
                 lastName = "Murthy_"+i;
                 wing = "L_"+i;
                 employeeList[i] = {"firstName" : firstName, "lastName" : lastName, "sso" : i,
                                     "floor" : i, "wing" : wing , "cubicle" : i };
             }
             //testing end
           
             return employeeList;
            
             //return $resource('http://localhost:5000/employeeFinder/find');
           }}])
    
});
