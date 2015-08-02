// Login.js is a module for holding the state of the logged in user.
// This is a termporary module until Stores are setup.

var user = null; // the logged in user

function setUser(loggedInUser) {
  user = loggedInUser;
}

function getUser() {
  return user;
}

module.exports = {
  setUser: setUser,
  getUser: getUser,
};
