/**
 * Created by tonim on 23/11/2016.
 */
angular.module('MinimApp').controller('StudentCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){
    $scope.Phone = {};
    var StudentID = window.location.href.split("/").pop();

    // when landing on the page, get all subjects
    $http.get('/students/' + StudentID)
        .success(function(data) {
            $scope.student = data;
            $scope.phones = data.phones;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.AddPhone = function () {
        $http.post('/students/addphone/' + StudentID, $scope.Phone)
            .success(function(data){
                $scope.Phone ={};
                $scope.student = data;
                $scope.phones = data.phones;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.RemovePhone = function (phone) {
        $http.delete('/students/deletephone/' + StudentID +'/' + phone)
            .success(function(data){
                $scope.student = data;
                $scope.phones = data.phones;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };


}]);