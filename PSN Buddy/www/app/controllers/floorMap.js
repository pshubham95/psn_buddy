define(['app', []], function (app) {
  'use strict';

app.controller('floorMapCtrl', function($scope){
    
    $scope.displayMap = false;
    
    $scope.floors =  [
        {floor_name : "Ground Floor", floor_number : "0"},
        {floor_name : "First Floor", floor_number : "1"},
        {floor_name : "Second Floor", floor_number : "2"},
        {floor_name : "Third Floor", floor_number : "3"},
        {floor_name : "Fourth Floor", floor_number : "4"},
        {floor_name : "Fifth Floor", floor_number : "5"},
        {floor_name : "Sixth Floor", floor_number : "6"},
        {floor_name : "Seventh Floor", floor_number : "7"}
    ];
    
    
    $scope.getSelectedFloor = function(){
      
        $scope.displayMap = false;
        
        if($scope.selectedFloor == 0){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/0.jpg";
            $scope.image_name = "Ground Floor Plan";
        }
        
        else if($scope.selectedFloor == 1){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/1.jpg";
            $scope.image_name = "First Floor Plan";
        }
        
        else if($scope.selectedFloor == 2){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/2.jpg";
            $scope.image_name = "Second Floor Plan";
        }
        
        else if($scope.selectedFloor == 3){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/3.jpg";
            $scope.image_name = "Third Floor Plan";
        }
        
        if($scope.selectedFloor == 4){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/4.jpg";
            $scope.image_name = "Fourth Floor Plan";
        }
        
        if($scope.selectedFloor == 5){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/5.jpg";
            $scope.image_name = "Fifth Floor Plan";
        }
        
        if($scope.selectedFloor == 6){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/6.jpg";
            $scope.image_name = "Sixth Floor Plan";
        }
        
        if($scope.selectedFloor == 7){
            $scope.displayMap = true;
            $scope.image_id = "img/maps/7.jpg";
            $scope.image_name = "Seventh Floor Plan";
        }
    }
    
    
    
    $scope.zoom = function(zm){
        
        var img=document.getElementById("pic");
        var wid=img.width;
        var ht=img.height;
        
        img.style.width=(wid*zm)+"px";
        img.style.height=(ht*zm)+"px";
    }
})

});
