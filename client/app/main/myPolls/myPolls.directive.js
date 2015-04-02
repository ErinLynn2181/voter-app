'use strict';

angular.module('votingApp')
  .directive('myPolls', function () {
    return {
      templateUrl: 'app/main/myPolls/myPolls.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });