var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var NavList = require('./NavList.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Navigation = ReactRouter.Navigation;
var Radium = require('radium');

var PropertyNav = React.createClass({
  mixins: [ Navigation ],

  /**
   * On clicking 'Return to Properties List', user returned to property list.
   */
  onClickReturn() {
    var userType = this.getUserType();
    this.transitionTo(`/${userType}/propertyList`);
  },

  /**
   * Gets the current userType as determined by the URL.
   * @return {String} The current user type.
   */
  getUserType() {
    var { pathname } = this.props.location;
    return pathname.split('/')[1];  // URL of the form: '/owner/...'
  },

  /**
   * Generates the navigation item data as a function of the current user
   * type and property id.
   * @return {Array} Array of navigation item data.
   */
  getNavItemData() {
    var { propertyId } = this.props.params;
    var userType = this.getUserType();
    var prefix = `/${userType}/property/${propertyId}`;

    var navItems = [
      { text: 'Property Details', path: `${prefix}/propertyDetails`, icon: 'location_city' },
      { text: 'Payments', path: `${prefix}/payments`, icon: 'attach_money' },
      { text: 'Repair Requests', path: `${prefix}/repairRequests`, icon: 'report_problem' },
      { text: 'Inspection Reports', path: `${prefix}/inspectionReports`, icon: 'visibility' },
      { text: 'Calendar', path: `${prefix}/calendar`, icon: 'event' },
    ];

    // Agents need to be a property specific chat
    if (userType == 'agent') {
      navItems.push({ text: 'Messages', path: `${prefix}/messages`, icon: 'message' });
    }

    return navItems;
  },

  render() {

    var navItemData = this.getNavItemData();

    return (
      <div style={styles.navContainer}>
        <div style={styles.spacer} />
        <Link style={styles.link} to={`/${this.getUserType()}/propertyList`}>
          &larr; Return to Properties List
        </Link>
        <NavList items={navItemData} />
      </div>
    );
  }
});

var styles = {
  navContainer: {
    width: '15em',
  },
  spacer: {
    backgroundColor: '#2ECC71',
    height: 50,
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '1em',
  }
}

module.exports = MuiContextified(Radium(PropertyNav));
