var React = require('react');
var Api = require('../utils/Api.js');
var Radium = require('radium');
var PropertyDetails = require('./PropertyDetails.jsx');
var User = require('../utils/User.js');

var OwnerPropertyDetails = React.createClass({
  getInitialState() {
    return {
      propertyDetails: undefined, // property details object
      responseReceived: false, // received API response?
    };
  },

  componentWillMount() {
    this.getPropertyDetails();
  },

  // Fetches the details for the property
  getPropertyDetails() {
    var { propertyId } = this.props.params;

    Api.getPropertyDetails({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        console.log(response.data);
        this.setState({
          responseReceived: true,
          propertyDetails: response.data,
        });
      }
    });
  },

  renderPropertyDetails() {
    var { responseReceived, propertyDetails } = this.state;
    var userType = User.getUser().type;

    // No API response yet received. Don't render anything.
    if (!responseReceived) return null;

    // Response was empty, so no property details to display.
    if (!propertyDetails) return <div>No property details</div>

    return (
      <PropertyDetails
        userType={userType}
        details={propertyDetails}
        onPropertyDetailsUpdated={this.getPropertyDetails} />
    );
  },

  render() {
    return (
      <div style={style.container}>
        { this.renderPropertyDetails() }
      </div>
    );
  }
});

var style = {
  container: {
    clear: 'both',
    display: 'flex',
  },
};

module.exports = Radium(OwnerPropertyDetails);
