'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  //mongo: {
  //  uri:    process.env.MONGOLAB_URI ||
  //          process.env.MONGOHQ_URL ||
  //          process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
  //          'mongodb://localhost/voting'
  //}
  mongo: {
    uri: 'mongodb://storbeck:616Ghost616@ds059661.mongolab.com:59661/heroku_app35470397'
  }
};
