var React = require('react');
<<<<<<< HEAD
var Navigation = require('react-router').Navigation;
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var MuiContextified = require('./MuiContextified.jsx');
=======
var MuiContextified = require('./MuiContextified.jsx');
var NavList = require('./NavList.jsx');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Navigation = ReactRouter.Navigation;
>>>>>>> master

var PropertyNav = React.createClass({
  mixins: [ Navigation ],

<<<<<<< HEAD
  render() {
    var {propertyId} = this.props.params;
    var prefix = `/owner/property/${propertyId}`;

    var navItemData = [
      // { text: 'Payments', path: `${prefix}/payments`, icon: 'attach_money' },
      // { text: 'Repair Requests', path: `${prefix}/repairRequests`, icon: 'attach_money' },

=======
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

    return [
>>>>>>> master
      { text: 'Property Details', path: `${prefix}/propertyDetails`, icon: 'location_city' },
      { text: 'Payments', path: `${prefix}/payments`, icon: 'attach_money' },
      { text: 'Repair Requests', path: `${prefix}/repairRequests`, icon: 'report_problem' },
      { text: 'Inspection Reports', path: `${prefix}/inspectionReports`, icon: 'visibility' },
      { text: 'Calendar', path: `${prefix}/calendar`, icon: 'event' },
    ];
<<<<<<< HEAD

    var navItems = navItemData.map(data => {
      var icon = <FontIcon className='material-icons'>{data.icon}</FontIcon>
      return (
        <ListItem key={data.text}
                  primaryText={data.text}
                  leftIcon={icon}
                  onClick={() => this.transitionTo(data.path)}
                  />
      );
    });

    return (
      <div>
        <div style={styles.spacer} />
        <List style={{width: '15em'}}>
          {navItems}
        </List>
=======
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
>>>>>>> master
      </div>
    );
  }
});

var styles = {
<<<<<<< HEAD
  spacer: {
    backgroundColor: '#2ECC71',
    height: 50,
=======
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
>>>>>>> master
  }
}

module.exports = MuiContextified(PropertyNav);
