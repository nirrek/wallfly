var React = require('react');
var User = require('../utils/User.js');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var Avatar = React.createClass({
  propTypes: {
    avatarUrl: React.PropTypes.string
  },

  render() {
    var { avatarUrl } = this.props;

    if (!avatarUrl) {
      avatarUrl = 'https://pbs.twimg.com/profile_images/479315519729070081/ty2LLr9m.jpeg';
    }

    return <img style={avatarStyle} width='40' height='40' src={avatarUrl} />;
  }
});

var avatarStyle = {
  borderRadius: 20,
};

var ChatMessage = React.createClass({
  propTypes: {
    avatarUrl: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
  },

  render() {
    var { avatarUrl, message, isUser } = this.props;

    var containerStyle = Object.assign({},
      msgStyle.container,
      isUser ? msgStyle.containerUser : {},
    );

    var messageStyle = Object.assign({},
      msgStyle.msg,
      isUser ? msgStyle.msgUser : {},
    );

    var avatarWrapperStyle = Object.assign({},
      msgStyle.avatarWrapper,
      isUser ? msgStyle.avatarWrapperUser : {},
    );

    return (
      <div style={containerStyle}>
        <div style={avatarWrapperStyle}>
          <Avatar avatarUrl={avatarUrl} />
        </div>
        <div style={messageStyle}>
          {message}
        </div>
      </div>
    );
  }
});

var msgStyle = {
  container: {
    display: 'flex',
    marginBottom: '1em',
  },
  avatarWrapper: {
    marginRight: 15,
    flexShrink: 0,
  },
  msg: {
    backgroundColor: '#F5F5F5',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#222',
    padding: '1em',
    lineHeight: '1.5',
  },
  avatarWrapperUser: {
    order: 1,
    marginRight: 0,
    marginLeft: 15,
  },
  msgUser: {
    // backgroundColor: '#2ECC71',
    // color: '#fff',
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
}

// TODO, pull up the handler logic into a higher component
var ChatPanel = React.createClass({
  getPropTypes() {
    return {
      sender: React.PropTypes.Number.isRequired,
    }
  },

  getInitialState() {
    return {
      messages: [],
      messageDraft: '',
    }
  },

  componentWillMount() {
    this.sender = this.props.sender;
    this.receiver = null;
    this.getMessages();

    this.token = window.setInterval(() => {
      this.getMessages();
    }, 5000);
  },

  componentWillUnmount() {
    window.clearInterval(this.token);
  },

  token: null, // interval token

  getMessages(callback) {
    Api.getMessages({
      callback: (err, response) => {
        var { data } = response;

        this.receiver = data.agent;  // TODO dont make agent hardcoded
        this.setState({
          messages: data.messages
        });

        if (callback) callback();
      }
    })
  },

  onSend(event) {
    event.preventDefault();
    event.stopPropagation();

    Api.postMessages({
      data: {
        sender: this.sender,
        receiver: this.receiver,
        message: this.state.messageDraft,
      },
      callback: (err, response) => {
        if (err) {
          // TODO
          return;
        }

        // Refetch all messages from the server.
        this.getMessages(() => {
          this.setState({ messageDraft: '' });
        });
      }
    })
  },

  onChange(event) {
    this.setState({ messageDraft: event.target.value });
  },

  render() {
    var { messages, messageDraft } = this.state;

    var messageComponents = messages.map(message => {
      var isUser = message.sender === User.getUserId();
      var avatar = isUser ? 'https://avatars3.githubusercontent.com/u/1008618?v=3&s=460'
                          : 'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/48.jpg'
      return <ChatMessage key={message.id} isUser={isUser} avatarUrl={avatar} message={message.message} />;
    });

    return (
      <div>
        <div>
          {messageComponents}
        </div>
        <div style={{display: 'flex'}}>
          <textarea value={messageDraft} onChange={this.onChange} style={panelStyle.textarea} />
          <RaisedButton style={{}} secondary={true} onClick={this.onSend}>Send</RaisedButton>
        </div>
      </div>
    );
  }
});

var panelStyle = {
  textarea: {
    borderRadius: 5,
    borderColor: '#ddd',
    flexGrow: 1,
    marginRight: 15,
    padding: '1em',
    outline: 'none',
  }
};

var Messages = React.createClass({
  render() {
    var userId = User.getUserId();

    return (
      <div style={style.page}>
        <h3>Chat with Mr Agent</h3>
        <ChatPanel sender={userId} />
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

module.exports = MuiContextified(Messages);
