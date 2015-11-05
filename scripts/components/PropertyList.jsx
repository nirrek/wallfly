var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var IconButton = MaterialUi.IconButton;
var Avatar = MaterialUi.Avatar;
var FloatingActionButton = MaterialUi.FloatingActionButton;
var Snackbar = MaterialUi.Snackbar;
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;
var User = require('../utils/User.js');
var Radium = require('radium');
var Notice = require('./Notice.jsx');
var fuzzy = require('fuzzy');
var AddPropertyDialog = require('./AddPropertyDialog.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');

/**
 * PropertyList Component.
 * View component displaying a list of properties for the current user.
 * Used by both the agent and owner on their property list page.
 */
var PropertyList = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      properties: [],
      responseReceived: false, // received API response?
      filter: '', // fuzzy search term for properties
      isPropertyDialogOpen: false,
      isWelcomeMessageOpen: false,
    };
  },

  componentWillMount() {
    this.getPropertyList();

    var user = User.getUser() || {};
    if (user.isFirstLogin === 1) {
      this.setState({ isWelcomeMessageOpen: true });
    }
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
   * Fetches the property list for the current user from the server.
   */
  getPropertyList() {
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

  /**
   * Filters a list of properties given the fuzzy ssearch term, and produces
   * the filtered list.
   * @param  {Array}  properties List of properties.
   * @param  {String} term       The seach term to filter the list on.
   * @return {Array}             Filtered list of properties.
   */
  filterProperties(properties, term) {
    var options = { extract: (p) => `${p.street} ${p.suburb}` };
    return fuzzy.filter(term, properties, options);
  },

  /**
   * Filter input field onChange event handler.
   * @param  {Object} event The event object.
   */
  onFilterChange(event) {
    this.setState({ 'filter': event.target.value });
  },

  /**
   * Tap event handler for a given property.
   * @param  {Number} propertyId The id of the tapped property.
   */
  onPropertyTap(propertyId) {
    var userType = this.getUserType();
    this.transitionTo(`/${userType}/property/${propertyId}/propertyDetails`);
  },

  /**
   * Click event handler for the add property button.
   */
  onAddPropertyClick() {
    this.setState({ isPropertyDialogOpen: true });
  },

  /**
   * Close event handler for the add property dialog.
   */
  onClose() {
    this.setState({ isPropertyDialogOpen: false });
  },

  /**
   * Property added event handler.
   */
  onAddProperty() {
    this.setState({ isPropertyDialogOpen: false });
    this.getPropertyList();
    this.refs.snackbar.show();
  },

  /**
   * Close event handler for the welcome dialog.
   */
  onWelcomeClose() {
    this.setState({ isWelcomeMessageOpen: false });
    var user = User.getUser();
    if (user) user.isFirstLogin = 0;
  },

  render() {
    // Don't render until we have data cached from the server.
    if (!this.state.responseReceived) return null;

    var user = User.getUser() || {};
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
    if (user.type === 'owner' && !user.managingAgent) {
      ownerNotice = (
        <Notice>Your account doesn't currently have a managing agent. Please get in touch with your agent and ask them to assign you as the owner of any of your properties by using your registered email address: <b>{user && user.email}</b>. Once they have done this, your properties will show up on this page, and your agent will be correctly listed as your managing agent.</Notice>
      );
    }

    // Check if user is an agent.
    var addProperty;
    var noProperties;
    if (user.type === 'agent') {
      addProperty = (
        <FloatingActionButton style={style.fab} onClick={this.onAddPropertyClick}>
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
      );

      if (properties.length === 0) {
        noProperties = (
          <div style={style.noProperties}> Looks like you haven't yet added any properties to manage.<br /> Use the green add button at the bottom to add one. </div>
        );
      }
    }

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
        <div style={style.filterContainer}>
          <input placeholder="Start typing to filter by suburb or street address"
                 ref="filter"
                 type="text"
                 style={style.filter}
                 onChange={this.onFilterChange} />
        </div>
        <div>
          {ownerNotice}
          <List>
            {propertyCards}
            {noProperties}
          </List>
          {addProperty}
        </div>
        <AddPropertyDialog isOpen={this.state.isPropertyDialogOpen}
                           onClose={this.onClose}
                           onAddProperty={this.onAddProperty} />
         <Snackbar
           ref="snackbar"
           message="Property Successfully Added"
           autoHideDuration={3000} />
      </div>
    );
  }
});

var style = {
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
  },
  fab: {
    position: 'fixed',
    bottom: 50,
    right: 45,
  },
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

module.exports = MuiContextified(Radium(PropertyList));
