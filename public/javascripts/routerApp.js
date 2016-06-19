'use strict';

angular.module('notepadApp', ['ui.router'])
    .config(function ($urlRouterProvider, $stateProvider) {


        $stateProvider
            .state('note',{
                url:"/",
                views:{
                    'content@':{
                        templateUrl : "main.html",
                        controller : "indexController"
                    }
                }
            })
            .state('label',{
                url:"/label/:labelid",
                views:{
                    'content@':{
                        templateUrl : "main.html",
                        controller : "indexController"
                    }
                }
            })
            .state('memo',{
                url:"/label/:labelid/memo/:memoid",
                views:{
                    'content@':{
                        templateUrl : "main.html",
                        controller : "indexController"
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });

