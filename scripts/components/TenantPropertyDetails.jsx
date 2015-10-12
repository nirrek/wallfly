var React = require('react');
var Api = require('../utils/Api.js');
var PropertyDetails = require('./PropertyDetails.jsx');
var User = require('../utils/User.js');
var Property = require('../utils/Property.js');
var Radium = require('radium');
var Notice = require('./Notice.jsx');

var OwnerPropertyDetails = React.createClass({
  getInitialState() {
    return {
      propertyDetails: undefined, // property details object
      responseReceived: false, // received API response?
      isNewAccount: false, // is this a new account w/o a property assigned?
    };
  },

  componentWillMount() {
    this.getPropertyDetails();
  },

  // Fetches the details for the property
  getPropertyDetails() {
    Api.getUserPropertyDetails({
      callback: (err, response) => {
        if (err) return console.log(err);

        this.setState({
          responseReceived: true,
          propertyDetails: response.data,
          isNewAccount: response.data ? false : true,
        });

        Property.setProperty(response.data);
      }
    });
  },

  renderPropertyDetails() {
    var { responseReceived, propertyDetails, isNewAccount } = this.state;
    var user = User.getUser();
    var userType;
    if (user) {
      userType = user.type;
    }

    // No API response yet received. Don't render anything.
    if (!responseReceived) {
      return null;
    }

    // Response was empty, so no property details to display.
    if (!propertyDetails) {
      return (
        <Notice>Your agent has not yet added you to a property. Please get in touch with your agent and ask them to add you to the property using your registered email address: <b>{user && user.email}</b></Notice>
      );
    }

    return (
      <PropertyDetails
        userType={userType}
        isNewAccount={isNewAccount}
        details={propertyDetails} />
    );
  },

  render() {
    return (
      <div>
        { this.renderPropertyDetails() }
      </div>
    );
  }
});

module.exports = Radium(OwnerPropertyDetails);
