'use strict';

angular.module('votingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/:user/:poll', { templateUrl: 'app/main/main.html', controller: 'MainCtrl' });
  });
