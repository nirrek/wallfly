var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var NavList = require('./NavList.jsx');
var Radium = require('radium');

// Navigation items data.
var prefix = '/agent';
var navItemData = [
  { text: 'Property List', path: `${prefix}/propertyList`, icon: 'location_city' },
  { text: 'Calendar (Global)', path: `${prefix}/calendar`, icon: 'event' },
  { text: 'Repairs (Global)', path: `${prefix}/repairRequests`, icon: 'report_problem' },
  { text: 'Overdue Rent', path: `${prefix}/overdueRent`, icon: 'attach_money' },
];

/**
 * AgentNav Component.
 * This is the navigation component for the agent user.
 */
var AgentNav = React.createClass({
  render() {
    return (
      <div style={styles.navContainer}>
        <div style={styles.spacer} />
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
  }
};

module.exports = Radium(MuiContextified(AgentNav));
