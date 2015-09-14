var React = require('react');
var Sidebar = require('react-sidebar');
var MuiContextified = require('./MuiContextified.jsx');
var NavigationList = require('./Navigation.jsx');
var Header = require('./Header.jsx');
var User = require('../utils/User.js');

/**
 * Component view for the authenticated section of the front-end. Includes
 * a docked sidebar on the LHS, header bar, and content panel on the right.
 * TODO: think of a better name.
 */
var AppFrame = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
  },

  getInitialState() {
    return {
      isSidebarOpen: false,
      isSidebarDocked: true,
    };
  },

  componentWillMount() {
    this.mql = window.matchMedia(`(min-width: 800px)`);
    this.mql.addListener(this.mediaQueryChanged);
    this.setState({ isSidebarDocked: this.mql.matches });
  },

  componentWillUnmount() {
    this.mql.removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged() {
    this.setState({ isSidebarDocked: this.mql.matches });
  },

  onSetSidebarOpen(isOpen) {
    this.setState({ isSidebarOpen: isOpen });
  },

  openMenu() {
    this.setState({ isSidebarOpen: true });
  },

  render() {
    return (
      <div>
        <Sidebar sidebar={this.props.sidebar}
                 open={this.state.isSidebarOpen}
                 docked={this.state.isSidebarDocked}
                 onSetOpen={this.onSetSidebarOpen}>
          <Header onMenuClick={this.openMenu}
                  isMenuDocked={this.state.isSidebarDocked}/>
          {this.props.main}
        </Sidebar>
      </div>
    );
  }
});

module.exports = MuiContextified(AppFrame);
