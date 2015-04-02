'use strict';

angular.module('votingApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $routeParams) {

    console.log($routeParams);

    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.posted = false;
    $scope.pollExists = false;
    $scope.page = 'newPoll';
    $scope.selectedPoll;
    var user_name = undefined;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.setPage = function(page, poll) {
      $scope.page = page;

      // Show all my polls
      if ($scope.page === 'myPolls') {
        var user = $scope.getCurrentUser.name;
        $http.get('/api/polls/' + user + '/all')
          .success(function(data) {
            var polls = [];
            $scope.pollsExist = (data.length > 0) ? true : false;
            if ($scope.pollsExist) {
              for (var i = 0; i < data.length; i++) {
                var posted_url = '' + document.URL + user.replace(' ', '-') + '/' + data[i].poll_name;
                polls.push({ user_name: data[i].user_name, poll_name: data[i].poll_name, posted_url: posted_url});
              }
              $scope.myPolls = polls;
            }
          });

      // A selected poll was clicked
      } else if ($scope.page === 'votePoll') {

        var user;
        if ($scope.user === undefined) {
          user = $scope.getCurrentUser.name;
        } else {
          user = $scope.user.replace('-',' ');
        }

        var user_name;
        var poll_name;
        var poll_options;
        var comments;

        poll = poll.replace(/[^\w\s]/gi, '')
        console.log('/api/polls/' + user + '/' + poll);
        $http.get('/api/polls/' + user + '/' + poll)
          .success(function(data) {
            console.log("success");
            if (data.length !== 0) {
              user_name = data[0].user_name;
              poll_name = data[0].poll_name;
              poll_options = data[0].poll_options;
              comments = data[0].comments;

              $scope.poll = {user_name: user_name, poll_name: poll_name, poll_options: poll_options, comments: comments };

              $scope.commentsExist = (comments.length > 0) ? true : false
            } else {
              $scope.pollExists = false;
            }
          });
        }
      }

      // Check direct urls
      if (Object.keys($routeParams).length === 2) {
        // direct url to a specific poll
        if ($routeParams.hasOwnProperty('user') && $routeParams.hasOwnProperty('poll')) {
          $scope.user = $routeParams.user;
          $scope.setPage('votePoll', $routeParams.poll)
          console.log('word')
        } else {
          console.log('why')
        }
      } else {
        console.log(Object.keys($routeParams).length);
      }
    });
