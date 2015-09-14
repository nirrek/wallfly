var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var RaisedButton = MaterialUi.RaisedButton;
var Paper = MaterialUi.Paper;
var Navigation = require('react-router').Navigation;

/**
 * PropertyList component.
 */
var PropertyList = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      properties: [],
    };
  },

  componentWillMount() {
    Api.getPropertyList({
      callback: (err, res) => {
        if (err) return;

        this.setState({ properties: res.data });
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
    var { properties } = this.state;

    var propertyCards = properties.map((property, idx) => {
      var { id, photo, street, suburb, postcode } = property;

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

    return (
      <div style={style.cardContainer}>
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

    // paddingBottom: '1em',
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
}

module.exports = MuiContextified(PropertyList);
