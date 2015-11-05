var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');

/**
 * Page component.
 * Component at the root of the 'page' render tree.
 */
var Page = React.createClass({
  componentWillMount() {
    this.listener = () => {
      this.setState({ height: window.innerHeight });
    };

    // Capture the height of the viewport in state and rerender when it changes
    this.setState({ height: window.innerHeight });
    window.addEventListener('resize', this.listener);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  },

  render() {
    // Height of the page needs to be a function of the viewport height.
    var panelHeight = {
      height: this.state.height - 50,
    };

    return (
      <div style={[panelHeight, style]}>
        {this.props.children}
      </div>
    );
  }
});

var style = {
  padding: '1em',
  overflowY: 'auto',
};

module.exports = MuiContextified(Radium(Page));
