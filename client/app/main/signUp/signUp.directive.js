'use strict';

angular.module('votingApp')
  .directive('signUp', function () {
    return {
      templateUrl: 'app/main/signUp/signUp.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });