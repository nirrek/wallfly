var React = require('react');
var Property = require('../utils/Property.js');
var Api = require('../utils/Api.js');
var Chat = require('./Chat.jsx');
var Label = require('./Label.jsx');
var mui = require('material-ui');
var SelectField = mui.SelectField;
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');

var Messages = React.createClass({
  getInitialState() {
    return {
      sender: null,
      receiver: null,
    };
  },

  componentWillMount() {
    Api.getPropertyContacts({
      propertyId: this.props.params.propertyId,
      callback: (err, res) => {
        this.setState({
          agent: res.data.agentId,
          owner: res.data.ownerId,
          tenant: res.data.tenantId,
        });
      }
    });
  },

  // Update select menu on change.
  onSelectChange(event, selectedUserTypeIndex) {
    var userType = userTypes[selectedUserTypeIndex].name;
    this.setState({ chatPartner: userType });
  },

  render() {
    var { agent, chatPartner } = this.state;
    var sender = agent;
    var receiver = this.state[chatPartner];

    if (!chatPartner) sender = null; // no chat partner, prevent redner.

    return (
      <div style={styles.page}>
        <div style={styles.selectorContainer}>
          <SelectField
            value={chatPartner}
            valueMember="name"
            hintText="Select Who To Chat With"
            onChange={this.onSelectChange}
            menuItems={userTypes} />
        </div>
        {sender ? (
          <Chat key={receiver}
                sender={sender}
                receiver={receiver}
                offset={-40} />
        ) : null}
      </div>
    );
  }
});

// User types
var userTypes = [
  { name: 'owner', text: 'Owner' },
  { name: 'tenant', text: 'Tenant' },
];

var styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectorContainer: {
    marginTop: '-13px',
  },
  label: {
    // display: 'inline',
    // lineHeight: 4,
    paddingBottom: '10px',
    marginRight: '1em',
  },
};

module.exports = Radium(MuiContextified(Messages));
