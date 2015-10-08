var React = require('react');
var Property = require('../utils/Property.js');
var Api = require('../utils/Api.js');
var Chat = require('./Chat.jsx');
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
      propertyId: Property.getPropertyId(),
      callback: (err, res) => {
        console.log(res);
        this.setState({
          sender: res.data.tenantId,
          receiver: res.data.agentId,
        });
      }
    });
  },

  render() {
    var { sender, receiver } = this.state;

    return (
      <div style={style.page}>
        {sender ? (
          <Chat sender={sender} receiver={receiver} />
        ) : null}
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  }
};

module.exports = Radium(Messages);
