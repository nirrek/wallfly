var React = require('react');
var Radium = require('radium');

/**
 * Status Component.
 * Status label component used for display various coloured status labels.
 */
var Status = React.createClass({
  propTypes: {
    type: React.PropTypes.string, // ['red', 'green', 'yellow', 'blue']
    children: React.PropTypes.node,
  },

  render() {
    return (
       <span style={[
            styles.status,
            styles[this.props.type]
         ]}>{this.props.children || this.props.type}</span>
    );
  }
});

var styles = {
  status: {
    backgroundColor: '#ECECEC',
    color: '#868686',
    padding: '3px 8px',
    borderRadius: 4,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    fontSize: 14,
  },
  red: {
    backgroundColor: '#F65035',
    color: '#5F1509',
  },
  yellow: {
    backgroundColor: 'rgba(253, 205, 42, 0.81)',
    color: '#6D5913',
  },
  blue: {
    backgroundColor: '#A9DDF9',
    color: '#26536B',
  },
  green: {
    backgroundColor: '#2ECC71',
    color: '#0E4A0E',
  }
};

module.exports = Radium(Status);
