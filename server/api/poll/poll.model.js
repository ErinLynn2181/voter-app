'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  user_name: String,
  poll_name: String,
  poll_options: Array,
  votes: Array,
  voted_users: Array,
  comments: Array
});

module.exports = mongoose.model('Poll', PollSchema);
