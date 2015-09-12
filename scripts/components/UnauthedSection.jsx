var React = require('react');
var Sidebar = require('react-sidebar');
var MuiContextified = require('./MuiContextified.jsx');
var NavigationList = require('./Navigation.jsx');
var Header = require('./Header.jsx');

/**
 * Component view for the unauthenticated section of the front-end.
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
}

module.exports = MuiContextified(UnauthedSection);
