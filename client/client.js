/**
 * Created by JFCS on 1/22/16.
 */
var app = angular.module('myApp',['ngRoute']);
// soo apparently i forgot about the existence of app factorys... would like to go back and
// refactor all of the global variables and http call functions into factorys. that way i can better access
// my information
var globalId = {id:1,name:'No User Selected'};
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
    $scope.title = 'Weekend Assignment, Week 5: Fun with Postgres';

        //$scope.name = globalId.name;
        $scope.users = [];

        userList = function() {
            $http.get('/api/user').then(function(response){
                console.log('repsonse in user call.',response.data);
                $scope.users = response.data;
            });

        };
        userList();

        addressList = function() {
            $http.post('/api/addresses',globalId).then(function(response){
                console.log('repsonse in addresses call.',response.data);
                globalAddresses = response.data;
            });

        };


        orderList = function() {
            $http.post('/api/orders',globalId).then(function(response){
                console.log('repsonse in order call.',response.data);
                globalOrders = response.data;
            });

        };




        $scope.grabId = function(userId){
            console.log("user id in function",userId);
            globalId.id = userId.id;
            globalId.name = userId.name;
            addressList();
            orderList();
        }

    }]);
        app.controller('View1Controller',['$scope','$http',function($scope,$http){
        $scope.title = 'Addresses on file for selected user.';

            $scope.name = globalId.name;
            $scope.addresses = [];

            localScope = function(){
                $scope.addresses = globalAddresses;

            };
            localScope();
            console.log('addresses in view one',$scope.addresses);

            //$scope.globeTest = function(){
            //    console.log('globals  in view 1',globalId,globalAddresses,globalOrders);
            //};

        }]);

        app.controller('View2Controller',['$scope','$http',function($scope,$http){
        $scope.title = 'Search Orders by Date';

            $scope.name = globalId.name;
            $scope.range = {};
            $scope.orders = [];
            localScope = function(){
                var holderArray = [];

                for(var i = 0;i<globalOrders.length;i++ ){
                    if(globalOrders[i].user_id == globalId.id){
                       holderArray.push(globalOrders[i]);
                    }
                }
              $scope.orders = holderArray;

            };
            localScope();
            console.log('orders in scope',$scope.orders);

            //was working on a way to compare dates on the client side, explored many options, filters on ng-repeat,
            // ng if statements etc, there has to be an easy client side method to use a comparison
            // inside the ng-repeat i just havent figured it out yet. i considered trying to convert all the date times
            // into milliseconds for easy comparisons, then convert it back to display. but couldn't find a function that did it
            //  in a way that made sense for what i wanted to do. considered going back to the drawing board and building a
            // better sql query and doing all the leg work in my post call. but i ran out of time. so this is what we
            // get for today.
            $scope.checkDate = function(){
                console.log('start date check',$scope.range.startDate);
                console.log('end date check',$scope.range.endDate);
                for(var i = 0; i < $scope.orders.length; i++){
                    if( $scope.orders[i].order_date >= $scope.range.startDate && $scope.orders[i].order_date <= $scope.range.endDate ){
                        console.log($scope.orders[i]);
                    }
                }
                //localScope();
            }

        }]);

