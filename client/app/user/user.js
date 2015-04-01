'use strict';

angular.module('votingApp')
  .config(function ($routeProvider) {
    $routeProvider
    /*
      .when('/user', {
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      })
    */
      .when('/:user/:poll', { templateUrl: 'app/user/user.html', controller: 'UserCtrl' });
  });
