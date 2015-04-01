'use strict';

angular.module('votingApp')
  .directive('loggedIn', function () {
    return {
      templateUrl: 'app/main/loggedIn/loggedIn.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });