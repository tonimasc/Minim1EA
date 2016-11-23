/**
 * Created by tonim on 22/11/2016.
 */

var MinimApp = angular.module('MinimApp', ['ngRoute']);

MinimApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/subjects', {
            templateUrl: './views/subjects.html',
            controller: 'SubjectsCtrl'
        })
        .otherwise({
            redirectTo: '/subjects'
        })
        .when('/students', {
            templateUrl: './views/students.html',
            controller: 'StudentsCtrl'
        })
        .otherwise({
            redirectTo: '/subjects'
        })
    .when('/subject/:id', {
        templateUrl: './views/subjectprofile.html',
        controller: 'SubjectCtrl'
    })
        .otherwise({
            redirectTo: '/subjects'
        })
    .when('/student/:id', {
        templateUrl: './views/studentprofile.html',
        controller: 'StudentCtrl'
    })
        .otherwise({
            redirectTo: '/subjects'
        });
}]);