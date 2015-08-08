var axios = require('axios');

let host = 'http://localhost:8000'
let userId; // current logged in user. Used in url creation.

let Api = {

  // Log in
  login({ username='',  password='', callback = () => {} } = {}) {
    axios.post(`${host}/login`, {
      username,
      password
    }, {
      withCredentials: true
    })
    .then((response) => { // 2xx response
      userId = response.data.id;
      callback(null, response);
    })
    .catch((response) => { // Non 2xx response received.
      let error = response.data.errorMessage;
      console.log(`Error in Api.login(): ${error}`);

      callback(new Error(error), response);
    });
  },

  // Fetch calendar events for the current user.
  getEvents({ callback = () => {} } = {}) {
    axios.get(`${host}/users/${userId}/events`, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.getEvents(): ${error}`);

      callback(new Error(error), response);
    });
  }
};

export default Api;
