/**
 * Created by tonim on 22/11/2016.
 */
angular.module('MinimApp').controller('StudentsCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){
    $scope.NewStudent = {};

    // when landing on the page, get all subjects
    $http.get('/students')
        .success(function(data) {
            $scope.students = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.CreateStudent = function () {
        $http.post('/students', $scope.NewStudent)
            .success(function(data){
                $scope.NewStudent = {}; //clear the form
                $scope.students = data;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.DeleteStudent = function (id) {
        $http.delete('/students/' + id)
            .success(function(data){
                $scope.students = data;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
}]);