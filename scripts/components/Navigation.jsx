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
      userId: '',
      userType: '',
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };
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

    var agentItemData = [
      { text: '', path: '', icon: '' }
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

    // Checks if the user is an Agent
    if (this.state.userType == "agent") {
      var agentItemData = [
        { text: 'Property List', path: '/propertyList', icon: 'list' }
      ];
    }

    // Maps the agent menu data
    var agentItems = agentItemData.map(data => {
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
          {agentItems}
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