var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var RaisedButton = MaterialUi.RaisedButton;
var Paper = MaterialUi.Paper;
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var Avatar = MaterialUi.Avatar;
var Navigation = require('react-router').Navigation;
var User = require('../utils/User.js');
var Radium = require('radium');
var Notice = require('./Notice.jsx');
var fuzzy = require('fuzzy');

/**
 * PropertyList component.
 */
var PropertyList = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      properties: [],
      responseReceived: false, // received API response?
      filter: '', // fuzzy search term for properties
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

  componentDidMount() {
    // focus fails until the DOM has done some sort of initialization.
    // hence the 300ms delay required.
    setTimeout(() => {
      var filterInput = React.findDOMNode(this.refs.filter);
      if (filterInput) filterInput.focus();
    }, 300);
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

  addPropertyClick(event) {
    event.preventDefault();
    event.stopPropagation();
    var userType = this.getUserType();
    this.transitionTo(`/${userType}/newProperty`);
  },

  // Filters a list of properties, given the fuzzy search term.
  // Produces the filtered list.
  filterProperties(properties, term) {
    var options = { extract: (p) => `${p.street} ${p.suburb}` };
    return fuzzy.filter(term, properties, options);
  },

  onFilterChange(event) {
    this.setState({ 'filter': event.target.value });
  },

  onPropertyTap(propertyId, event) {
    var userType = this.getUserType();
    this.transitionTo(`/${userType}/property/${propertyId}/propertyDetails`);
  },

  render() {
    // Don't render until we have data cached from the server.
    if (!this.state.responseReceived) return null;

    var user = User.getUser();
    var { properties, filter } = this.state;

    var filteredProperties = this.filterProperties(properties, filter);

    var propertyCards = filteredProperties.map((filterMatch, idx) => {
      var { id, photo, street, suburb } = filterMatch.original;

      return (
        <ListItem
          key={street + idx}
          style={style.listItem}
          onTouchTap={this.onPropertyTap.bind(this, id)}
          leftAvatar={<Avatar src={photo} />}
          primaryText={street}
          secondaryText={suburb}
          rightIcon={<FontIcon className="material-icons">chevron_right</FontIcon>}
          />
      );
    });

    // Check if an owner does not have an agent yet.
    var ownerNotice;
    if (user && user.type === 'owner' && !user.managingAgent) {
      ownerNotice = (
        <Notice>Your account doesn't currently have a managing agent. Please get in touch with your agent and ask them to assign you as the owner of any of your properties by using your registered email address: <b>{user && user.email}</b>. Once they have done this, your properties will show up on this page, and your agent will be correctly listed as your managing agent.</Notice>
      );
    }

    // Check if user is an agent.
    var addProperty;
    if (user && user.type === 'agent') {
      addProperty = (
        <Paper key='addproperty' zIndex={1} style={style.card}>
          <div style={style.content}>
            <RaisedButton label="Add New Property"
                          primary={true}
                          onClick={this.addPropertyClick.bind(this)} />
          </div>
        </Paper>
      );
    }

    return (
      <div>
        <div style={style.filterContainer}>
          <input placeholder="Start typing to filter by suburb or street address"
                 ref="filter"
                 type="text"
                 style={style.filter}
                 onChange={this.onFilterChange} />
        </div>
        <div style={style.cardContainer}>
          {ownerNotice}
          <List>
          {propertyCards}
          </List>
          {addProperty}
        </div>
      </div>
    );
  }
});

var style = {
  cardContainer: {
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
  filterContainer: {
    padding: '10px 14px',
  },
  filter: {
    width: '100%',
    fontSize: 18,
    padding: '.7em',
    border: '1px solid #ddd',
    borderRadius: 4,
    ':focus': {
      outline: 'none',
      boxShadow: 'inset 0 0 0 1px #2ECC71',
      border: '1px solid #2ECC71',
    }
  },
  listItem: {
    width: '100%',
    paddingRight: 20,
  }
};

module.exports = MuiContextified(Radium(PropertyList));
