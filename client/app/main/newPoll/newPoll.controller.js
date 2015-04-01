'use strict';

angular.module('votingApp')
  .controller('NewPollCtrl', function ($http, $scope, Auth) {
    $scope.message = 'Hello';

    var getCurrentUser = Auth.getCurrentUser();
    $scope.placeholders = ['Pepsi', 'Coca-Cola'];
    $scope.pollName;
    $scope.pollOptions = [];


    $scope.newOption = function() {
      $scope.placeholders.push('New Option');
    }

    $scope.submit = function() {

      // Remove special characters
      var poll_name = $scope.pollName.replace(/[^\w\s]/gi, '')
      $http.get('/api/polls/' + getCurrentUser.name + '/' + poll_name)
        .success(function(data) {
          // Poll does not already exist for user, create it
          if (data.length === 0) {
            var post_data = {
              user_name: getCurrentUser.name,
              poll_name: poll_name,
              poll_options: $scope.pollOptions,
              votes: [],
              voted_users: [],
              comments: []
            }
            $http.post('/api/polls', post_data)
              .success(function(data) {
                var user = getCurrentUser.name.replace(' ', '-');
                var poll_name = data.poll_name.replace(' ', '-');
                $scope.$parent.posted_url = '' + document.URL + user + '/' + poll_name;
                $scope.$parent.posted = true;
              })

          } else {
            console.log("already exists");
            $scope.$parent.pollExists = true;
          }
        });
    }
  });
