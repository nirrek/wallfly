var React = require('react');
var Property = require('../utils/Property.js');
var Api = require('../utils/Api.js');
var Chat = require('./Chat.jsx');
var User = require('../utils/User.js');
var Radium = require('radium');

var Messages = React.createClass({
  render() {
    var user = User.getUser();
    var sender = user.id;
    var receiver = user.managingAgent;

    return (
      <div style={style.page}>
        <Chat sender={sender} receiver={receiver} />
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
