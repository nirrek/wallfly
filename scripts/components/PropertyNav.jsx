var React = require('react');
var Navigation = require('react-router').Navigation;
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var MuiContextified = require('./MuiContextified.jsx');

var PropertyNav = React.createClass({
  mixins: [ Navigation ],

  render() {
    var {propertyId} = this.props.params;
    var prefix = `/owner/property/${propertyId}`;

    var navItemData = [
      // { text: 'Payments', path: `${prefix}/payments`, icon: 'attach_money' },
      // { text: 'Repair Requests', path: `${prefix}/repairRequests`, icon: 'attach_money' },

      { text: 'Property Details', path: `${prefix}/propertyDetails`, icon: 'location_city' },
      { text: 'Payments', path: `${prefix}/payments`, icon: 'attach_money' },
      { text: 'Repair Requests', path: `${prefix}/repairRequests`, icon: 'report_problem' },
      { text: 'Inspection Reports', path: `${prefix}/inspectionReports`, icon: 'visibility' },
      { text: 'Calendar', path: `${prefix}/calendar`, icon: 'event' },
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
      </div>
    );
  }
});

var styles = {
  spacer: {
    backgroundColor: '#2ECC71',
    height: 50,
  }
}

module.exports = MuiContextified(PropertyNav);
