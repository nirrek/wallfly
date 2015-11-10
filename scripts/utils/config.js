/**
 * Configuration details for the client.
 */

var server = __DEV__ ? 'http://127.0.0.1:8000' // Local server during dev.
                     : 'http://54.66.236.15';  // Deployment server.

module.exports = {
  server: server
};
