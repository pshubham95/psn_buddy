define([
  'app'
], function (app) {
  'use strict';    
  
    app.service('empFinderService',[
       function () {
           
           this.findEmployeeLocationDetails = function($http, sso_selection,fn_selection,ln_selection){
               return $http.post("http://localhost:5000/employeeFinder/find", {sso:sso_selection, fname: fn_selection,lname: ln_selection});     
           }}])
    
});
