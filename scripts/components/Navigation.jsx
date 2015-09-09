var React = require('react');
var Navigation = require('react-router').Navigation;
var MaterialUi = require('material-ui');
var List = MaterialUi.List;
var ListItem = MaterialUi.ListItem;
var FontIcon = MaterialUi.FontIcon;
var Api = require('../utils/Api.js');

var NavigationList = React.createClass({
  // Sets the state to be ready to retrieve user model
  getInitialState() {
    return {
      type: '',
    }
  },

  componentWillMount() {
    Api.getUser({
      callback: (err, response) => {
        if (err) {
          // TODO
          return console.log(err);
        }

        this.setState(response.data);
      }
    });
  },

  mixins: [ Navigation ],

  render() {

    var navItemData = [
      { text: 'Property Details', path: '/propertyDetails', icon: 'location_city' },
      { text: 'Payments', path: '/payments', icon: 'attach_money' },
      { text: 'Repair Request', path: '/repairRequest', icon: 'report_problem' },
      { text: 'Inspection Report', path: '/inspectionReport', icon: 'visibility' },
      { text: 'RTA Form', path: '/rtaForm', icon: 'assignment' },
      { text: 'Calendar', path: '/calendar', icon: 'event' },
      { text: 'Messages', path: '/messages', icon: 'message' },
    ];

    // Check the type of the current user
    if (this.state.type == "agent") {
      // Append the information item to navItemData
      navItemData.push({ text: 'Property List', path: '/propertyList', icon: 'list' });
    }

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

module.exports = NavigationList;