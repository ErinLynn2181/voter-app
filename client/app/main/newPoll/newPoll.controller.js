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
          var results = [];
          for (var i = 0; i < $scope.pollOptions.length; i++) {
            results.push(0);
          }
          if (data.length === 0) {
            var post_data = {
              user_name: getCurrentUser.name,
              poll_name: poll_name,
              poll_options: $scope.pollOptions,
              poll_results: results,
              votes: [],
              voted_users: [],
              comments: []
            }
            $http.post('/api/polls', post_data)
              .success(function(data) {
                var user = getCurrentUser.name.replace(' ', '-');
                var poll_name = data.poll_name;
                $scope.$parent.posted_url = undefined;
                $scope.$parent.posted_url = '' + document.URL + user + '/' + poll_name;
                $scope.$parent.posted = true;

                // Remove form data from page after being submitted
                $scope.pollName = undefined;
                $scope.pollOptions = [];

                $scope.$parent.page = 'newPollPosted';
              })

          } else {
            // Poll already exists, don't create it
            $scope.$parent.pollExists = true;
          }
        });
    }
  });
