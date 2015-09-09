var React = require('react');
var Navigation = require('react-router').Navigation;
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var MuiContextified = require('./MuiContextified.jsx');

var NavigationList = React.createClass({
  mixins: [ Navigation ],

  render() {
    var prefix = '/tenant';

    var navItemData = [
      { text: 'Property Details', path: `${prefix}/propertyDetails`, icon: 'location_city' },
      { text: 'Payments', path: `${prefix}/payments`, icon: 'attach_money' },
      { text: 'Repair Request', path: `${prefix}/repairRequest`, icon: 'report_problem' },
      { text: 'Inspection Report', path: `${prefix}/inspectionReport`, icon: 'visibility' },
      { text: 'RTA Form', path: `${prefix}/rtaForm`, icon: 'assignment' },
      { text: 'Calendar', path: `${prefix}/calendar`, icon: 'event' },
      { text: 'Messages', path: `${prefix}/messages`, icon: 'message' },
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

module.exports = MuiContextified(NavigationList);
