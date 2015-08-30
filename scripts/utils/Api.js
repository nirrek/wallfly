var axios = require('axios');
var config = require('./config.js');
var User = require('./User.js');

let host = config.server;
let userId = User.getUserId(); // current logged in user. Used in url creation.

/**
 * Api Module
 * The Api module contains all interactions with the server. If you want to
 * make network requests to the server, then it should be a method in the Api
 * module that initiates the request.
 */
let Api = {

  createAccount({ data={}, callback=()=>{} }) {
    axios.post(`${host}/users`, data, {
      withCredentials: true
    })
    .then((response) => { // 2xx response
      callback(null, response);
    })
    .catch((response) => { // Non 2xx response
      let error = response.data.errorMessage;
      console.log(`Error in Api.createAccount(): ${error}`);

      callback(new Error(error), response);
    });
  },

  // Log a user in
  login({ data={}, callback=()=>{} }) {
    axios.post(`${host}/login`, data, {
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

  // Fetches a user model for the current user
  getUser({ callback = () => {} } = {}) {
    axios.get(`${host}/users/${userId}`, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.getUser(): ${error}`);

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
  },

  // Fetch messages for the current user.
  getMessages({ callback = () => {} } = {}) {
    axios.get(`${host}/users/${userId}/messages`, {
        withCredentials: true, // send cookies for cross-site requests
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.getMessages(): ${error}`);

      callback(new Error(error), response);
    });
  },

  // Post new messages from the current user
  postMessages({ data={}, callback=()=>{} }) {
    data.sender = userId;
    axios.post(`${host}/users/${userId}/messages`, data, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.postMessages(): ${error}`);
      callback(new Error(error), response);
    });
  },

  // Fetch property inspection details
  getInspections({ callback=()=>{} }) {
    axios.get(`${host}/users/${userId}/inspections`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getInspections(): ${error}`);
        callback(new Error(error), response);
      });
  },

  // Fetch list of past rent payments
  getPayments({ callback=()=>{} }) {
    axios.get(`${host}/users/${userId}/payments`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPayments(): ${error}`);
        callback(new Error(error), response);
      });
  },

  // Fetch list of repair requests
  getRepairRequests({ callback=()=>{} }) {
    axios.get(`${host}/users/${userId}/repairs`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getRepairRequests(): ${error}`);
        callback(new Error(error), response);
      });
  },

  // Add a new repair request
  addRepairRequest({ data={}, callback=()=>{} }) {
    data.sender = userId;
    axios.post(`${host}/users/${userId}/repairs`, data, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.addRepairRequest(): ${error}`);
      callback(new Error(error), response);
    });
  },

  // Fetch information for a given tenants property
  getPropertyDetails({ callback=()=>{} }) {
    axios.get(`${host}/users/${userId}/property`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyDetails(): ${error}`);
        callback(new Error(error), response);
      });
  },
};

module.exports = Api;
