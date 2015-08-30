var cookie = require('react-cookie');

var userId;

module.exports = {
  /**
   * Fetches the userId for the currently authenticated user.
   * @return {Number|undefined} Returns the current user id, if no current user
   *                            returns undefined.
   */
  getUserId() {
    if (!userId) { // try to load from a cookie if undefined
      userId = cookie.load('userId');
    }

    return userId;
  },

  /**
   * Sets the current user. Currently only storing the userId.
   */
  setUser(userModel) {
    userId = userModel.id;
    cookie.save('userId', userId);
  },

  // Deletes the current user model, including associated cookie data.
  deleteUser() {
    userId = undefined;
    cookie.remove('userId');
  }
};
