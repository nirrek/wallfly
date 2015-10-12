var React = require('react');
var Chat = require('./Chat.jsx');
var User = require('../utils/User.js');
var Radium = require('radium');
var Notice = require('./Notice.jsx');

var Messages = React.createClass({
  render() {
    var user = User.getUser();
    var sender = user.id;
    var receiver = user.managingAgent;

    return (
      <div style={style.page}>
        { user.managingAgent ? (
          <Chat sender={sender} receiver={receiver} />
        ) : (
          <Notice>Your account doesn't currently have a managing agent. Please get in touch with your agent and ask them to assign you as the owner of any of your properties by using your registered email address: <b>{user && user.email}</b>. Once they have done this, you will be able to use this page to chat to your agent.</Notice>
        ) }
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
