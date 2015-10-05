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
      withCredentials: true,
      timeout: 4000,
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

  // Logout a user
  logout({ callback=()=>{} }) {
    axios.get(`${host}/logout`, {
      withCredentials: true
    })
    .then((response) => { // 2xx response
      callback(null, response);
    })
    .catch((response) => { // Non 2xx response received.
      let error = response.data.errorMessage;
      console.log(`Error in Api.logout(): ${error}`);
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

  // Update the user model
  updateUser({ data={}, callback = () => {} } = {}) {
    axios.put(`${host}/users/${userId}`, data, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.updateUser(): ${error}`);
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


  // Add a new payment
  addPayment({ data={}, callback=()=>{} }) {
    data.sender = userId;
    axios.post(`${host}/users/${userId}/payments`, data, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.addPayment(): ${error}`);
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
  getUserPropertyDetails({ callback=()=>{} }) {
    axios.get(`${host}/users/${userId}/property`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getUserPropertyDetails(): ${error}`);
        callback(new Error(error), response);
      });
  },

  // ---------------------------------------------------------------------------
  // Owner / Agent endpoints
  // TODO. Delegate the tenant api calls to these ones.
  // ---------------------------------------------------------------------------
  getPropertyList({ callback=()=>{} }) {
    userId = User.getUserId();
    console.log('UserID = ', userId);

    axios.get(`${host}/properties`, {
        params: {
          userId: userId,
        },
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyList(): ${error}`);
        callback(new Error(error), response);
      });
  },

  // Add a new property
  addNewProperty({ data={}, callback=()=>{} }) {
    userId = User.getUserId();

    axios.post(`${host}/properties`, data, {
      params: {
        userId: userId,
      },
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.addNewProperty(): ${error}`);
      callback(new Error(error), response);
    });
  },

  // Fetch property details for the specified property
  getPropertyDetails({ propertyId, callback=()=>{} }) {
    axios.get(`${host}/properties/${propertyId}/details`, {
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

  // Update details for the specified property
  updatePropertyDetails({ data={}, callback=()=>{} }) {
    axios.post(`${host}/properties/${data.propertyId}/details`, data, {
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

  // Fetches payments for a particular property
  getPropertyPayments({ propertyId, callback=()=>{} }) {
    axios.get(`${host}/properties/${propertyId}/payments`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyPayments(): ${error}`);
        callback(new Error(error), response);
      });
  },

  getPropertyRepairRequests({ propertyId, callback=()=>{} }) {
    axios.get(`${host}/properties/${propertyId}/repairRequests`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyRepairRequests(): ${error}`);
        callback(new Error(error), response);
      });
  },

  updateRepairRequest({ data={}, callback=()=>{} }) {
    axios.put(`${host}/properties/${data.propertyId}/repairRequests`, data, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.updateRepairRequest(): ${error}`);
      callback(new Error(error), response);
    });
  },

  getPropertyInspectionReports({ propertyId, callback=()=>{} }) {
    axios.get(`${host}/properties/${propertyId}/inspectionReports`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyInspectionReports(): ${error}`);
        callback(new Error(error), response);
      });
  },

  addPropertyInspectionReports({ data={}, callback=()=>{} }) {
    axios.post(`${host}/properties/${data.propertyId}/inspectionReports`, data, {
      withCredentials: true
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.addPropertyInspectionReports(): ${error}`);
      callback(new Error(error), response);
    });
  },

  getPropertyCalendarEvents({ propertyId, callback=()=>{} }) {
    axios.get(`${host}/properties/${propertyId}/calendarEvents`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyCalendarEvents(): ${error}`);
        callback(new Error(error), response);
      });
  },

  getPropertyContacts({ propertyId, callback=()=>{} }) {
    axios.get(`${host}/properties/${propertyId}/contacts`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((response) => {
        let error = response.data.errorMessage;
        console.log(`Error in Api.getPropertyContacts(): ${error}`);
        callback(new Error(error), response);
      });
  },


  // ---------------------------------------------------------------------------
  // Messages Resource Endpoints
  // TODO Update tenant message API calls to use these.
  // ---------------------------------------------------------------------------

  // Returns the 20 most recent messages sent to the authenticated user from
  // the specified senderId.
  // Parameters:
  //  - senderId: the senderId of the messages to fetch.
  //  - count(optional): number of messages to fetch
  //  - offset(optional): offset in the message history (allow for paging)
  fetchMessages({ params={}, callback = ()=>{} } = {}) {
    axios.get(`${host}/messages`, {
      params: params,
      withCredentials: true, // send cookies for cross-site requests
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((response) => {
      let error = response.data.errorMessage;
      console.log(`Error in Api.fetchMessages(): ${error}`);
      callback(new Error(error), response);
    });
  },

  // Sends a new message to the specified user from the authenticated user.
  // Parameters:
  //   - partnerId: the id of recipient of the message.
  //   - message: Message to send
  newMessage({ params={}, callback=()=>{} }) {
    axios.post(`${host}/messages`, params, {
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

};




module.exports = Api;
