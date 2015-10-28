var React = require('react');
var Api = require('../utils/Api.js');
var PropertyDetails = require('./PropertyDetails.jsx');
var User = require('../utils/User.js');
var Property = require('../utils/Property.js');
var Radium = require('radium');
var Notice = require('./Notice.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');
var MaterialUi = require('material-ui');
var IconButton = MaterialUi.IconButton;
var MuiContextified = require('./MuiContextified.jsx');
var Router = require('react-router');
var Link = Router.Link;


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

    var user = User.getUser() || {};
    if (user.isFirstLogin === 1) {
      this.setState({ isWelcomeMessageOpen: true });
    }
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

  onWelcomeClose() {
    this.setState({ isWelcomeMessageOpen: false });
    var user = User.getUser();
    if (user) user.isFirstLogin = 0;
  },

  render() {
    var user = User.getUser() || {};

    // Greeting modal shown on first login for a user.
    var firstLoginGreeting = (
      <DialogEnhanced isOpen={this.state.isWelcomeMessageOpen}
                      modal={true}
                      actions={[{ text: 'Ok Got It', onTouchTap: this.onWelcomeClose }]}
                      autoScrollBodyContent={true}
                      autoDetectWindowHeight={true}
                      contentStyle={{width: 500}}>
        <div style={style.greeting}>
          <h2>Welcome to Wallfly!</h2>
          <p>To get you started we've made a handy quickstart guide that gives you an overview of what you can do with Wallfly. You can view it right now by <Link to={`/guides/${user.type}`}>clicking here</Link>.</p>
          <p>If you prefer to have a play with the app first though, you can always find the guide in the menu at the top of the page by clicking the <span style={style.gearPlaceholder}><IconButton style={style.gear} iconClassName="material-icons">settings</IconButton></span> icon.</p>
          <div style={style.imgContainer}>
            <img width="247" height="184" src={require(`../../assets/userguide.png`)} />
          </div>
        </div>
      </DialogEnhanced>
    );

    return (
      <div>
        {firstLoginGreeting}
        { this.renderPropertyDetails() }
      </div>
    );
  }
});

var style = {
  greeting: {
    textAlign: 'center',
  },
  gearPlaceholder: {
    position: 'relative',
    display: 'inline-block',
    width: 30,
  },
  gear: {
    position: 'absolute',
    left: -10,
    top: -30,
  },
  imgContainer: {
    margin: '2em 0 0 0',
  },
  noProperties: {
    margin: '.5em 1em',
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  }
};

module.exports = MuiContextified(Radium(OwnerPropertyDetails));
