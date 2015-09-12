var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');

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

module.exports = MuiContextified(Page);
