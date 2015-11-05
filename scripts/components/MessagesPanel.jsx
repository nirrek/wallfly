var React = require('react');
var Radium = require('radium');

/**
 * MessagesPanel Component
 * Component for rendering a list of messages in the Chat component.
 */
var MessagesPanel = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired,
  },

  componentDidMount() {
    var node = React.findDOMNode(this);

    // Await the changes being flushed to the DOM.
    window.setTimeout(() => {
      node.scrollTop = node.scrollHeight;
    }, 100);
  },

  componentWillUpdate() {
    var node = React.findDOMNode(this);
    this.shouldScrollBottom =
      (node.scrollTop + node.offsetHeight === node.scrollHeight);
  },

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      var node = React.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  },

  render() {
    var { messages, style } = this.props;

    return (
      <div style={style}>
        { messages.length > 0 ? (
          messages
        ) : (
          <div style={styles.empty}>Send your first message below.</div>
        )}
      </div>
    );
  }
});

var styles = {
  empty: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: '1em',
    color: '#999',
  },
};

module.exports = Radium(MessagesPanel);






