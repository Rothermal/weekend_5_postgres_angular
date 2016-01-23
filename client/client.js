/**
 * Created by JFCS on 1/22/16.
 */
var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider

        .when('/view1',{
            templateUrl:'views/view1.html',
            controller:'View1Controller'
        })

        .when('/view2',{
            templateUrl:'views/view2.html',
            controller:'View2Controller'
        });

    //$locationProvider.html5Mode(true);
}]);
    app.controller('IndexController',['$scope','$http',function($scope,$http){
    $scope.title = 'this is the header';
}]);
    app.controller('View1Controller',['$scope','$http',function($scope,$http){
        $scope.title = 'I\'m from view 1';
}]);

    app.controller('View2Controller',['$scope','$http',function($scope,$http){
    $scope.title = 'I\'m from view 2';
}]);