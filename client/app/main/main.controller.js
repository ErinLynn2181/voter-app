'use strict';

angular.module('votingApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $routeParams) {
    $scope.awesomeThings = [];
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.posted = false;
    $scope.pollExists = false;
    $scope.page = 'newPoll';
    $scope.selectedPoll;
    var user_name = undefined;

    function populate() {
      var user = $scope.getCurrentUser.name;
      $http.get('/api/polls/' + user + '/all')
        .success(function(data) {
          var polls = [];
          $scope.pollsExist = (data.length > 0) ? true : false;
          if ($scope.pollsExist) {
            for (var i = 0; i < data.length; i++) {
              var posted_url = '' + document.URL + user + '/' + data[i].poll_name;
              polls.push(data[i]);
            }
          }
          $scope.myPolls = polls;
        });
    }


    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.delete = function(poll_name) {
      var user = $scope.getCurrentUser.name;
      $http.get('/api/polls/' + user + '/' + poll_name)
        .success(function(data) {
          if (data.length > 0) {
            $http.delete('/api/polls/' + data[0]._id)
              .success(function() {
                // regenerate list with new item removed
                populate();
              })
          }
        })
    };

    // update results
    $scope.submit = function(choice) {
      var index = $scope.poll.poll_options.indexOf($scope.form.choice);
      $scope.poll.poll_results[index]++;
      $scope.poll.voted_users.push($scope.getCurrentUser.name)
      console.log($scope.poll);
      $http.put('/api/polls/' + $scope.poll._id,  $scope.poll).then(function(data) {
        $scope.setPage('results', $scope.poll);
      });
      //console.log($scope.poll.poll_name + $scope.form.choice);
    }

    $scope.setPage = function(page, poll) {
      $scope.page = page;

      // Show all my polls
      if ($scope.page === 'myPolls') {
        populate();

      // A selected poll was clicked
      } else if ($scope.page === 'votePoll') {

        var user;
        if ($scope.user === undefined) {
          user = $scope.getCurrentUser.name;
        } else {
          user = $scope.user.replace('-',' ');
        }

        var comments;

        poll = poll.replace(/[^\w\s]/gi, '')

        $http.get('/api/polls/' + user + '/' + poll)
          .success(function(data) {
            if (data.length !== 0) {
              comments = data[0].comments;
              $scope.poll = data[0];
              $scope.commentsExist = (comments.length > 0) ? true : false

              if ($scope.poll.voted_users.indexOf(user) >= 0) {
                $scope.setPage('results', $scope.poll);
              } else {
                console.log($scope.poll.voted_users + ' // ' + user);
              }
            } else {
              $scope.pollExists = false;
            }
          });
        } else if ($scope.page === 'results') {
          var user;
          if ($scope.user === undefined) {
            user = $scope.getCurrentUser.name;
          } else {
            user = $scope.user.replace('-',' ');
          }

          $http.get('/api/polls/' + user + '/' + $scope.poll.poll_name)
            .success(function(data) {
              $scope.results = data[0].poll_results;
              var ctx = document.getElementById("myChart").getContext("2d");
              var data = {
                labels: $scope.poll.poll_options,
                datasets: [{
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: $scope.poll.poll_results
                    }]
              };
              var myBarChart = new Chart(ctx).Bar(data, {
                barShowStroke: false
              });

            })
        }
      }

      // Check direct urls
      if (Object.keys($routeParams).length === 2) {
        // direct url to a specific poll
        if ($routeParams.hasOwnProperty('user') && $routeParams.hasOwnProperty('poll')) {
          $scope.user = $routeParams.user;
          $scope.setPage('votePoll', $routeParams.poll)
        }
      }

    });
