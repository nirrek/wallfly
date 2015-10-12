var React = require('react');
var Radium = require('radium');

/**
 * The notice component is used for displaying notices for users. Typically
 * the intent is a small notification about an exception circumstance (such
 * as not having a registered agent).
 */
var Notice = React.createClass({
  propTypes: {
    children: React.PropTypes.any.isRequired,
  },

  render() {
    return (
      <div style={styles.notice}>
        {this.props.children}
      </div>
    );
  }
});

var styles = {
  notice: {
    maxWidth: '40em',
    margin: '1em auto 0 auto',
    background: '#FFFBDE',
    padding: '1em',
    border: '1px solid rgba(0,0,0,.04)',
    borderRadius: '4px',
  },
};

module.exports = Radium(Notice);
