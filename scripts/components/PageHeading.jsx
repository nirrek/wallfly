var React = require('react');
var Radium = require('radium');

/**
 * PageHeading Component.
 * Component for displaying the heading of a page.
 */
var PageHeading = React.createClass({
  shouldComponentUpdate() { return false; },
  render() {
    return <h1 style={styles.heading}>{this.props.children}</h1>;
  }
});

var styles = {
  heading: {
    fontSize: 27,
    lineHeight: 1.5,
    margin: '0 0 10px 0',
    color: '#444',
  }
};

module.exports = Radium(PageHeading);
