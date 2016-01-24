/**
 * Created by JFCS on 1/22/16.
 */
var app = angular.module('myApp',['ngRoute']);

var globalId = {id:1};
var globalOrders = [];
var globalAddresses = [];

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

        $scope.user = {};
        $scope.users = [];

        userList = function() {
            $http.get('/api/user').then(function(response){
                console.log('repsonse in user call.',response.data);
                $scope.users = response.data;
            });
            $scope.user = {};
        };
        userList();

        addressList = function() {
            $http.post('/api/addresses',globalId).then(function(response){
                console.log('repsonse in addresses call.',response.data);
                globalAddresses = response.data;
            });
            $scope.address = {};
        };


        orderList = function() {
            $http.post('/api/orders',globalId).then(function(response){
                console.log('repsonse in order call.',response.data);
                globalOrders = response.data;
            });
            $scope.order = {};
        };




        $scope.grabId = function(userId){
            console.log("user id in function",userId);
            globalId.id = userId;
            addressList();
            orderList();
        }

    }]);
        app.controller('View1Controller',['$scope','$http',function($scope,$http){
        $scope.title = 'I\'m the addresses';

            $scope.address = {};
            $scope.addresses = [];

            localScope = function(){
                $scope.addresses = globalAddresses;

            };
            localScope();
            console.log('addresses in view one',$scope.addresses);

            //addressList = function() {
            //    $http.post('/api/addresses',globalId).then(function(response){
            //        console.log('repsonse in addresses call.',response.data);
            //        globalAddresses = response.data;
            //    });
            //    $scope.address = {};
            //};

            $scope.globeTest = function(){
                console.log('globals  in view 1',globalId,globalAddresses,globalOrders);
            };

        }]);

        app.controller('View2Controller',['$scope','$http',function($scope,$http){
        $scope.title = 'I\'m the orders';

            $scope.order = {};
            $scope.orders = [];

            localScope = function(){
                $scope.orders = globalOrders;

            };
            localScope();
            console.log('orders in scope',$scope.orders);

        }]);

