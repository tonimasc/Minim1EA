/**
 * Created by tonim on 22/11/2016.
 */
angular.module('MinimApp').controller('SubjectsCtrl',['$scope','$http','$routeParams' ,function($scope, $http, $routeParams){
    $scope.NewSubject = {};
    $scope.SubjectError = {};
    $scope.SubSearch = {};
    $scope.Season = {};
    $scope.OrderDo = {};

    $scope.Order = function (value) {
        $scope.OrderDo = value;
    };
    $scope.Order2 = function () {
        $scope.OrderDo = '-students.length';
    };
    $scope.Order3 = function () {
        $scope.OrderDo = '+students.length';
        console.log($scope.OrderDo);
    };

    // when landing on the page, get all subjects
    $http.get('/subjects')
        .success(function(data) {
            $scope.subjects = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.CreateSubject = function () {
        $http.post('/subjects', $scope.NewSubject)
            .success(function(data){
                $scope.NewSubject = {}; //clear the form
                $scope.subjects = data;
                $scope.SubjectError = {};
            })
            .error(function(data){
                console.log('Error:' + data);
                $scope.SubjectError = true;
            });
    };

    $scope.DeleteSubject = function (id) {
        $http.delete('/subjects/' + id)
            .success(function(data){
                $scope.subjects = data;
                $scope.SubjectFound = data;
            })
            .error(function(data){
                console.log('Error:' + data);
            });
    };
    $scope.SearchName = function () {
        console.log($scope.SubSearch.name);
        $http.get('/subjects/search/' + $scope.SubSearch.name)
            .success(function(data) {
                $scope.SubjectFound = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.SearchSeason = function () {
        console.log($scope.Season.when);
        $http.get('/subjects/search/when/' + $scope.Season.when)
            .success(function(data) {
                $scope.subjects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.GetAllSubjects = function () {
        $http.get('/subjects')
            .success(function(data) {
                $scope.subjects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };



}]);