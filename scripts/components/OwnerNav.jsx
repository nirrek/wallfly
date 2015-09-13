var React = require('react');
<<<<<<< HEAD
var Navigation = require('react-router').Navigation;
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var MuiContextified = require('./MuiContextified.jsx');

var OwnerNav = React.createClass({
  mixins: [ Navigation ],

  render() {
    var prefix = '/owner';

    var navItemData = [
      { text: 'Property List', path: `${prefix}/propertyList`, icon: 'location_city' },
      { text: 'Agent Chat', path: `${prefix}/messages`, icon: 'message' },
    ];

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
var MuiContextified = require('./MuiContextified.jsx');
var NavList = require('./NavList.jsx');

// Navigation items data.
var prefix = '/owner';
var navItemData = [
  { text: 'Property List', path: `${prefix}/propertyList`, icon: 'location_city' },
  { text: 'Agent Chat', path: `${prefix}/messages`, icon: 'message' },
];

var OwnerNav = React.createClass({
  render() {
    return (
      <div style={styles.navContainer}>
        <div style={styles.spacer} />
        <NavList items={navItemData} />
>>>>>>> master
      </div>
    );
  }
});

var styles = {
<<<<<<< HEAD
=======
  navContainer: {
    width: '15em',
  },
>>>>>>> master
  spacer: {
    backgroundColor: '#2ECC71',
    height: 50,
  }
}

module.exports = MuiContextified(OwnerNav);
