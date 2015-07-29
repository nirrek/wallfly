import React from 'react';

class Avatar extends React.Component {
  static propTypes = {
    avatarUrl: React.PropTypes.string
  }

  render() {
    let { avatarUrl } = this.props;

    if (!avatarUrl) {
      avatarUrl = 'https://pbs.twimg.com/profile_images/479315519729070081/ty2LLr9m.jpeg';
    }

    return <img style={avatarStyle} width='40' height='40' src={avatarUrl} />;
  }
}

let avatarStyle = {
  borderRadius: 20,
}

class ChatMessage extends React.Component {
  static propTypes = {
    avatarUrl: React.PropTypes.string,
    message: React.PropTypes.string.is
  }

  render() {
    let { avatarUrl, message, isUser } = this.props;

    let containerStyle = Object.assign({},
      msgStyle.container,
      isUser ? msgStyle.containerUser : {},
    );

    let messageStyle = Object.assign({},
      msgStyle.msg,
      isUser ? msgStyle.msgUser : {},
    );

    let avatarWrapperStyle = Object.assign({},
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
}

let msgStyle = {
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

class ChatPanel extends React.Component {
  render() {
    let msg = 'hey there this is I need some help with the apartment' +
              'hey there this is I need some help with the apartment' +
              'hey there this is I need some help with the apartment' +
              'hey there this is I need some help with the apartment';

    return (
      <div>
        <div>
          <ChatMessage isUser={true} avatarUrl={'https://s3.amazonaws.com/uifaces/faces/twitter/madysondesigns/48.jpg'} message={msg} />
          <ChatMessage isUser={false} avatarUrl={'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/48.jpg'} message={'No worries I can do that.'} />
          <ChatMessage isUser={true} avatarUrl={'https://s3.amazonaws.com/uifaces/faces/twitter/madysondesigns/48.jpg'} message={'Great. Thanks so much'} />
        </div>
        <div style={{display: 'flex'}}>
          <textarea style={panelStyle.textarea} /><button>Send</button>
        </div>
      </div>
    );
  }
}

let panelStyle = {
  textarea: {
    borderRadius: 5,
    borderColor: '#ddd',
    flexGrow: 1,
    marginRight: 15,
    padding: '1em',
  }
};

class RepairRequest extends React.Component {
  render() {
    return (
      <div style={style.page}>
        <h3>Chat with Mr Agent</h3>
        <ChatPanel />
      </div>
    );
  }
}

let style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default RepairRequest;
