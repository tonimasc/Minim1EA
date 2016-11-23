/**
 * Created by tonim on 23/11/2016.
 */
angular.module('MinimApp').controller('SubjectCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){

    var SubjectID = window.location.href.split("/").pop();

    // when landing on the page get subject
    $http.get('/subjects/'+ SubjectID)
        .success(function(data) {
            $scope.subject = data;
            $scope.subjectstudents = data.students;
            console.log($scope.subjectstudents);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when landing on the page, get all students
    $http.get('/students')
        .success(function(data) {
            $scope.students = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.AddStudentInSubject = function (id) {
        $scope.AddStudent = {
            student_id: id
        };
        $http.post('/subjects/addstudent/' + SubjectID, $scope.AddStudent)
            .success(function(data){
                $scope.subject = data;
                $scope.subjectstudents= data.students;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

    $scope.QuitStudentInSubject = function (id) {
        $http.delete('/subjects/deletestudent/' + SubjectID +'/'+ id)
            .success(function(data){
                $scope.subject = data;
                $scope.subjectstudents= data.students;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };

}]);