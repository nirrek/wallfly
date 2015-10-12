var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var RaisedButton = MaterialUi.RaisedButton;
var Paper = MaterialUi.Paper;
var Navigation = require('react-router').Navigation;
var User = require('../utils/User.js');
var Radium = require('radium');
var Notice = require('./Notice.jsx');

/**
 * PropertyList component.
 */
var PropertyList = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      properties: [],
      responseReceived: false, // received API response?
    };
  },

  componentWillMount() {
    Api.getPropertyList({
      callback: (err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        // Set the managing agent so we can consume it in Chat.
        if (this.getUserType() === 'owner') {
          if (res.data.length > 0) {
            User.set('managingAgent', res.data[0].agentId);
          }
        }

        this.setState({
          responseReceived: true,
          properties: res.data,
        });
      }
    });
  },

  /**
   * Gets the current userType as determined by the URL.
   * @return {String} The current user type.
   */
  getUserType() {
    // Note that there is an important bug this implementation takes into
    // account. If the page is refreshed the split path will be
    // ['', 'owner', ...] if the path is navigated to via push API, the split
    // path will be ['owner', ...].
    var { pathname } = this.props.location;
    var split = pathname.split('/');
    if      (split.indexOf('owner') != -1) return 'owner';
    else if (split.indexOf('agent') != -1) return 'agent';
    return '';
  },

  onPropertyClick(propertyId, event) {
    event.preventDefault();
    event.stopPropagation();
    var userType = this.getUserType();
    this.transitionTo(`/${userType}/property/${propertyId}/propertyDetails`);
  },

  render() {
    // Don't render until we have data cached from the server.
    if (!this.state.responseReceived) return null;

    var user = User.getUser();
    var { properties } = this.state;

    var propertyCards = properties.map((property, idx) => {
      var { id, photo, street, suburb } = property;

      return (
        <Paper key={street + idx} zIndex={1} style={style.card}>
          <img src={photo} style={style.img} />
          <div style={style.content}>
            <div style={style.address}>
              {street} {suburb}
            </div>
            <RaisedButton label="View Property Dashboard"
                          primary={true}
                          onClick={this.onPropertyClick.bind(this, id)} />
          </div>
        </Paper>
      );
    });

    // Check if an owner does not have an agent yet.
    var ownerNotice;
    if (user && user.type === 'owner' && !user.managingAgent) {
      ownerNotice = (
        <Notice>Your account doesn't currently have a managing agent. Please get in touch with your agent and ask them to assign you as the owner of any of your properties by using your registered email address: <b>{user && user.email}</b>. Once they have done this, your properties will show up on this page, and your agent will be correctly listed as your managing agent.</Notice>
      );
    }



    return (
      <div style={style.cardContainer}>
        {ownerNotice}
        {propertyCards}
      </div>
    );
  }
});

var style = {
  cardContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  card: {
    width: 300,
    height: 320,
    margin: '1em',
    display: 'flex',
    flexFlow: 'column',
  },
  content: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexGrow: 1,
    padding: '1em 0',
  },
  address: {
    fontSize: 18,
  },
  img: {
    width: 300,
  },
};

module.exports = Radium(MuiContextified(PropertyList));
