'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(200, polls);
  });
};

// Get a single poll
/*
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    return res.json(poll);
  });
};
*/

exports.show = function(req, res) {
  // Return all polls
  if (req.params.poll_name === 'all') {
    Poll.find({'user_name': req.params.user_name}, function(err, poll) {
      if(err) { return handleError(res, err); }
      if(!poll) { return res.send(404); }
      return res.json(poll);
    });
  // Return single poll
  } else {
    Poll.find({'user_name': req.params.user_name, 'poll_name': req.params.poll_name}, function(err, poll) {
      if(err) { return handleError(res, err); }
      if(!poll) { return res.send(404); }
      return res.json(poll);
    });
  }
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.json(201, poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    /*
    console.log(poll);
    console.log(req.body);
    if (err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    var updated = _.merge(poll, req.body);
    updated.voted_users = req.body.voted_users;
    updated.poll_results = req.body.poll_results;
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, poll);
    });
    */
    console.log(poll);
    poll.remove(function(err) {
      if (err) { return handleError(res, err); }
      Poll.create(req.body, function(err, poll) {
        if (err) { return handleError(res, err); }
        return res.json(201, poll);
      })
    })
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
