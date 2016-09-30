define([
  'app'
], function (app) {
  'use strict';    
  
    app.service('empFinderService',[
        function () {
             alert("in employee finder service");
             //return $resource('http://localhost:5000/employeeFinder/find');
        }])
    
});
