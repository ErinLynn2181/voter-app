'use strict';

angular.module('votingApp')
  .controller('UserCtrl', function ($http, $scope, $routeParams) {
    $scope.pollExists = true;

    var user = $routeParams.user.replace('-',' ');
    var poll = $routeParams.poll.replace('-',' ');

    var user_name;
    var poll_name;
    var poll_options;
    var comments;

    poll = poll.replace(/[^\w\s]/gi, '')
    $http.get('/api/polls/' + user + '/' + poll)
      .success(function(data) {

        console.log(data);
        if (data.length !== 0) {
          user_name = data[0].user_name;
          poll_name = data[0].poll_name;
          poll_options = data[0].poll_options;
          comments = data[0].comments;
          console.log(data[0]);

          $scope.poll = {user_name: user_name, poll_name: poll_name, poll_options: poll_options, comments: comments };

          $scope.commentsExist = (comments.length > 0) ? true : false
        } else {
          console.log("already exists");
          $scope.pollExists = false;
        }
      });



  });
