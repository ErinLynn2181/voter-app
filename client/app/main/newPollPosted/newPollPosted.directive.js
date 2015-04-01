'use strict';

angular.module('votingApp')
  .directive('newPollPosted', function () {
    return {
      templateUrl: 'app/main/newPollPosted/newPollPosted.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });