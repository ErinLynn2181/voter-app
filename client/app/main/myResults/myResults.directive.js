'use strict';

angular.module('votingApp')
  .directive('myResults', function () {
    return {
      templateUrl: 'app/main/myResults/myResults.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });