'use strict';

angular.module('votingApp')
  .directive('votePoll', function () {
    return {
      templateUrl: 'app/main/votePoll/votePoll.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });