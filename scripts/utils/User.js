var cookie = require('react-cookie');

var userId;

module.exports = {
  getUserId() {
    if (!userId) { // try to load from a cookie if undefined
      userId = cookie.load('userId');
    }

    return userId;
  },
};
