var React = require('react');
var Api = require('../utils/Api.js');
var User = require('../utils/User.js');
var Message = require('./Message.jsx');
var MessagesPanel = require('./MessagesPanel.jsx');
var Radium = require('radium');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var FontIcon = mui.FontIcon;
var FloatingActionButton = mui.FloatingActionButton;

/**
 * Merges two message lists and produces the merged list. O(n).
 * List is ordered from oldest to youngest.
 * @param  {Array} oldList The old message list.
 * @param  {Array} newList The new message list.
 * @return {Array}         The merged message list.
 */
function mergeMessageLists(oldList, newList) {
  oldList.sort((a, b) => a.id - b.id);
  newList.sort((a, b) => a.id - b.id);

  var merged = [];
  var i = 0;
  var j = 0;
  while (i < oldList.length || j < newList.length) {
    if      (i == oldList.length) merged.push(newList[j++]);
    else if (j == newList.length) merged.push(oldList[i++]);
    else if (oldList[i].id - newList[j].id < 0) merged.push(oldList[i++]);
    else if (oldList[i].id - newList[j].id > 0) merged.push(newList[j++]);
    else {
      merged.push(newList[j++]);
      i++;
    }
  }

  // sort by timestamp. Oldest first.
  merged.sort((a, b) => {
    return (new Date(a.timestamp)).getTime() -(new Date(b.timestamp)).getTime();
  });

  return merged;
}

/**
 * Chat Component.
 * Provides a chat component for instant messaging between participants.
 */
var Chat = React.createClass({
  propTypes: {
    sender: React.PropTypes.number.isRequired,
    receiver: React.PropTypes.number.isRequired,
    offset: React.PropTypes.number,
  },

  getInitialState() {
    return {
      messages: [],
      message: '', // current text in the compose field
    };
  },

  componentWillMount() {
    this.fetchMessages();
  },

  componentDidMount() {
    // Focus the compose textfield
    React.findDOMNode(this.refs.compose).focus();

    // Poll the server for changes every 5 seconds
    this.intervalToken = window.setInterval(() => {
      this.fetchMessages();
    }, 5000);
  },

  componentWillUnmount() {
    // Stop polling the server
    window.clearInterval(this.intervalToken);
  },

  /**
   * Fetch the chat messages.
   */
  fetchMessages() {
    var { receiver } = this.props;
    var { messages } = this.state;

    Api.fetchMessages({
      params: { partnerId: receiver },
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState({ messages: mergeMessageLists(messages, response.data) });
      }
    });
  },

  /**
   * Send message event handler.
   */
  onSend() {
    if (this.state.message == '') return;

    Api.newMessage({
      params: {
        receiverId: this.props.receiver,
        message: this.state.message,
      },
      callback: (err, res) => {
        if (err) return console.log(err);
      this.fetchMessages();
      }
    });
    this.setState({ message: '' });
    React.findDOMNode(this.refs.compose).focus(); // refocus compose input.
  },

  /**
   * Chat composer keypress event handler. Detects when the enter key
   * has been pressed and sends a message.
   * @param  {Object} event The event object.
   */
  onKeyDown(event) {
    if (event.keyCode === 13) { // Enter key pressed
      event.preventDefault();
      this.onSend();
    }
  },

  /**
   * Event handler that captures characters types in the chat composer field.
   * @param  {Object} event Event object.
   */
  onType(event) {
    this.setState({ message: event.target.value });
  },

  render() {
    var { message } = this.state;

    var messages = this.state.messages.map(m => {
      var isUser = (m.sender.id === User.getUserId());
      return <Message key={m.id} message={m} isUser={isUser} />
    });

    var messagePanelHeight = {
      height: window.innerHeight - 160 + (this.props.offset || 0),
    };

    return (
      <div style={[styles.root]}>
        <MessagesPanel messages={messages} style={[styles.messagesPanel, messagePanelHeight]} />
        <div style={styles.composePanel}>
          <textarea
            ref="compose"
            value={message}
            onChange={this.onType}
            onKeyDown={this.onKeyDown}
            style={styles.compose} />
          <FloatingActionButton
            onClick={this.onSend}
            style={styles.fab}
            backgroundColor="#ddd"
            iconStyle={styles.fabIcon}
            mini={true}>
            <FontIcon style={styles.fabIcon} className="material-icons">send</FontIcon>
          </FloatingActionButton>
        </div>
      </div>
    );
  }
});

var styles = {
  root: {
    display: 'flex',
    flexFlow: 'column',
  },
  messagesPanel: {
    flexGrow: 1,
    overflow: 'auto',
    padding: '10px 10px 0 0',
  },
  composePanel: {
    paddingTop: 3,
    position: 'relative',
  },
  compose: {
    width: '100%',
    border: '2px solid #ddd',
    padding: '1em',
    lineHeight: 1.5,
    borderRadius: 4,
    fontSize: 13,
    ':focus': {
      outline: 'none',
      border: '2px solid #2ECC71',
    },
  },
  fab: {
    position: 'absolute',
    right: 15,
    top: 17,
    boxShadow: 'none',
  },
  fabIcon: {
    color: '#909090'
  }
};

module.exports = MuiContextified(Radium(Chat));






