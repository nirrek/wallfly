/**
 * User module.
 * Stores the current user model for the client and provides relevant
 * services for the model.
 */
var cookie = require('react-cookie');
var user; // the user model

module.exports = {
  /**
   * Fetches the userId for the currently authenticated user.
   * @return {Number|undefined} Returns the current user id, if no current user
   *                            returns undefined.
   */
  getUserId() {
    // The user model is not set. Typically this means that the browser has
    // been refreshed, thus the JS memory being cleared. Try cookies for userId
    if (!user) {
      return cookie.load('userId');
    }

    return user.id;
  },

  /**
   * Fetches the current user model.
   * @return {Object} The current user model.
   */
  getUser() {
    return user;
  },

  /**
   * Sets the current user.
   * @param {Object} userModel The user model to set the current user as.
   */
  setUser(userModel) {
    user = userModel;
    cookie.save('userId', user.id, { path: '/' });
  },

  /**
   * Add a new key/value property to the user objects.
   * @param {String} key   The property key
   * @param {Any} value    The property value
   */
  set(key, value) {
    if (!user) return;
    user[key] = value;
  },

  /**
   * Deletes the current user model, including associated cookie data.
   * @return {[type]} [description]
   */
  deleteUser() {
    user = undefined;
    cookie.remove('userId');
  }
};
