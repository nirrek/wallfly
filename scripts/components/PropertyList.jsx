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

  onPropertyClick(propertyId, event) {
    event.preventDefault();
    event.stopPropagation();

    this.transitionTo(`/owner/property/${propertyId}/propertyDetails`);
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
