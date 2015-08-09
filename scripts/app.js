var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var history = require('react-router/lib/BrowserHistory').history;
var Sidebar = require('react-sidebar');
var Header = require('./components/Header.react.jsx');
var NavigationList = require('./components/Navigation.react.jsx');
var injectTapEventPlugin = require('react-tap-event-plugin');
var mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
var PropertyDetails = require('./components/PropertyDetails.react.jsx');
var Payments = require('./components/Payments.react.jsx');
var RepairRequest = require('./components/RepairRequest.react.jsx');
var Calendar = require('./components/Calendar.react.jsx');
var InspectionReport = require('./components/InspectionReport.react.jsx');
var RtaForm = require('./components/RtaForm.react.jsx');
var Messages = require('./components/Messages.react.jsx');
var Login = require('./components/Login.react.jsx');

require('../styles/main.scss');

var App = React.createClass({
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      isSidebarDocked: true,
    }
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    this.mql = window.matchMedia(`(min-width: 800px)`);
    this.mql.addListener(this.mediaQueryChanged);
    this.setState({ isSidebarDocked: this.mql.matches });

    // material-ui components depend on this for touch event listening.
    injectTapEventPlugin();
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
    return(
      <div>
        <Sidebar sidebar={<NavigationList />}
                 open={this.state.isSidebarOpen}
                 docked={this.state.isSidebarDocked}
                 onSetOpen={this.onSetSidebarOpen}>
          <Header onMenuClick={this.openMenu}
                  isMenuDocked={this.state.isSidebarDocked}/>
          {this.props.children}
        </Sidebar>
      </div>
    );
  }
});

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render((
  <Router history={history}>
    <Router component={App}>
      <Router path="/" component={Login} />
      <Router path="propertyDetails" component={PropertyDetails} />
      <Router path="payments" component={Payments} />
      <Router path="repairRequest" component={RepairRequest} />
      <Router path="calendar" component={Calendar} />
      <Router path="inspectionReport" component={InspectionReport} />
      <Router path="rtaForm" component={RtaForm} />
      <Router path="messages" component={Messages} />
    </Router>
  </Router>
), document.getElementById('react'));
