var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');

/**
 * Page component.
 */
var Page = React.createClass({
  render() {
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
});

var style = {
  padding: '1em'
};

module.exports = MuiContextified(Radium(Page));
