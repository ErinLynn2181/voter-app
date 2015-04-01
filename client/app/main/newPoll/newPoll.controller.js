'use strict';

angular.module('votingApp')
  .controller('NewPollCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.options = [];

    $scope.newOption = function() {
      var _id = $scope.options.length + 2;
      var newObject = {
        label: "option" + _id,
        id: "option" + _id,
        placeholder: "New Option"
      }
      $scope.options.push(newObject);
    }
  });
