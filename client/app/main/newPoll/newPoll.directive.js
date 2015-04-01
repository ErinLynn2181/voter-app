'use strict';

angular.module('votingApp')
  .directive('newPoll', function () {
    return {
      templateUrl: 'app/main/newPoll/newPoll.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });