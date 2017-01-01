// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova', 'ionic-material'])
//.config(function ($stateProvider, $urlRouterProvider) {
//  $stateProvider
//    .state('home', {
//      url: '/home',
//      templateUrl: 'templates/home.html',
//      controller: 'homeController'
//    })
//    .state('job', {
//      url: '/jobs',
//      templateUrl: 'templates/jobDetail.html',
//      controller: 'jobDetailController'
//    });
//  $urlRouterProvider.otherwise(function ($injector, $location) {
//    var $state = $injector.get("$state");
//    $state.go('job');
//  });

//})
.factory('socket', function ($rootScope) {
  var socket = io.connect('http://112.78.3.114:2000');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          };
        });
      });
    }
  };
})
.directive('ngLastRepeat', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngLastRepeat'+ (attr.ngLastRepeat ? '.'+attr.ngLastRepeat : ''));
                });
            }
        }
    };
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
