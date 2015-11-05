var React = require('react');
var Radium = require('radium');
var Avatar = require('./Avatar.jsx');

/**
 * Message Component.
 * Component for rendering a single message in a chat view.
 */
var Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    isUser: React.PropTypes.bool.isRequired,
  },

  render() {
    var { message, isUser } = this.props;
    var sender = message.sender;
    var { id, message } = message;

    return (
      <div style={[
          styles.container,
          isUser && styles.containerUser,
        ]} key={id}>
        <div style={[
            styles.avatarContainer,
            isUser && styles.avatarContainerUser,
          ]}>
          <Avatar src={sender.avatar} />
        </div>
        <div style={[
            styles.message,
            isUser && styles.messageUser,
          ]}>
          {message}
        </div>
      </div>
    );
  }
});

var styles = {
  container: {
    display: 'flex',
    marginBottom: '1em',
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    flexShrink: 0,
    marginRight: 10,
    height: 40,
  },
  avatarContainerUser: {
    order: 1,
    marginRight: 0,
    marginLeft: 10,
  },
  message: {
    backgroundColor: '#F5F5F5',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#222',
    padding: '10px 15px',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    marginRight: 50,
  },
  messageUser: {
    backgroundColor: '#D6E4DC',
    color: '#283A30',
    marginRight: 0,
    marginLeft: 50,
  }
};

module.exports = Radium(Message);
