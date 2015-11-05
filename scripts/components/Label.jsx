var React = require('react');
var Radium = require('radium');

/**
 * Label Component
 * Component for form labels throughout the application.
 */
var Label = React.createClass({
  propTypes: {
    inline: React.PropTypes.bool
  },
  render() {
    return (
      <label style={[
          styles.label,
          this.props.inline && styles.inline
        ]}>
        {this.props.children}
      </label>
    );
  }
});

var styles = {
  label: {
    display: 'block',
    fontSize: 16,
    color: 'rgba(0,0,0, .3)',
    marginTop: '1.5em',
  },
  inline: {
    display: 'inline-block',
    marginTop: 0,
    marginRight: '1em',
  },
};

module.exports = Radium(Label);
