var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');

/**
 * Page component.
 */
var Page = React.createClass({
  componentWillMount() {
    this.listener = () => {
      this.setState({ height: window.innerHeight });
    };

    this.setState({ height: window.innerHeight });
    window.addEventListener('resize', this.listener);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  },

  render() {
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
