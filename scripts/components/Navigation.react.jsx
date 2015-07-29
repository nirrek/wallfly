import React from 'react';
import { Navigation } from 'react-router';
import { List, ListItem, FontIcon } from 'material-ui';

let NavigationList = React.createClass({
  mixins: [ Navigation ],

  render() {

    let navItemData = [
      { text: 'Property Details', path: '/propertyDetails', icon: 'location_city' },
      { text: 'Payments', path: '/payments', icon: 'attach_money' },
      { text: 'Repair Request', path: '/repairRequest', icon: 'report_problem' },
      { text: 'Inspection Report', path: '/inspectionReport', icon: 'visibility' },
      { text: 'RTA Form', path: '/rtaForm', icon: 'assignment' },
      { text: 'Calendar', path: '/calendar', icon: 'event' },
      { text: 'Messages', path: '/messages', icon: 'message' },
    ];

    let navItems = navItemData.map(data => {
      let icon = <FontIcon className='material-icons'>{data.icon}</FontIcon>
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

let styles = {
  spacer: {
    backgroundColor: '#2ECC71',
    height: 50,
  }
}

export default NavigationList;
