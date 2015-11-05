var React = require('react');
var Radium = require('radium');

/**
 * Priority Component.
 * Priority label component used for priorities of repair requests.
 */
var Priority = React.createClass({
  propTypes: {
    type: React.PropTypes.string, // ['Urgent', 'Can Wait', 'Information']
    children: React.PropTypes.node,
  },

  render() {
    var priorityStyle;
    switch (this.props.type) {
      case 'Urgent':      priorityStyle = styles.urgent;      break;
      case 'Can Wait':    priorityStyle = styles.canWait;     break;
      case 'Information': priorityStyle = styles.information; break;
    }

    return (
       <span style={[
           styles.priority,
           priorityStyle
         ]}>{this.props.children || this.props.type}</span>
    );
  }
});

var styles = {
  priority: {
    backgroundColor: '#A9DDF9',
    color: 'rgba(214, 214, 214, 0.81)',
    padding: '3px 8px',
    borderRadius: 4,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    fontSize: 14,
  },
  urgent: {
    backgroundColor: '#F65035',
    color: '#5F1509',
  },
  canWait: {
    backgroundColor: 'rgba(253, 205, 42, 0.81)',
    color: '#6D5913',
  },
  information: {
    backgroundColor: '#A9DDF9',
    color: '#26536B',
  },
};

module.exports = Radium(Priority);
