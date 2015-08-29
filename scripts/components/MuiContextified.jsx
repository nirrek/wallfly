var React = require('react');
var MaterialUi = require('material-ui');
var theme = new MaterialUi.Styles.ThemeManager();

/**
 * A higher order component that endows the composed component with a correctly
 * set muiTheme property on the context. This solves the mui bug.
 * @param {ReactComponent} ComposedComponent The component to wrap.
 */
var MuiContextified = function(ComposedComponent) {
  return React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object },
    getChildContext() { return { muiTheme: theme }; },

    render() {
      return <ComposedComponent {...this.props} />;
    }
  });
};

module.exports = MuiContextified;
