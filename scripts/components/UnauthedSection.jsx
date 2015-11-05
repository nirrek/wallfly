var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Header = require('./Header.jsx');
var Radium = require('radium');

/**
 * UnauthedSection Component.
 * Wrapper view for the unauthenticated section of the front-end.
 */
var UnauthedSection = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
  },

  render() {
    return (
      <div style={style.container}>
          <Header isBasic={true} />
          {this.props.children}
      </div>
    );
  }
});

var style = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
};

module.exports = Radium(MuiContextified(UnauthedSection));
