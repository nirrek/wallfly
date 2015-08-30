var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var history = require('react-router/lib/BrowserHistory').history;
var injectTapEventPlugin = require('react-tap-event-plugin');
var mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
var User = require('./utils/User.js');
var Api = require('./utils/Api.js');
var PropertyDetails = require('./components/PropertyDetails.jsx');
var Payments = require('./components/Payments.jsx');
var RepairRequest = require('./components/RepairRequest.jsx');
var Calendar = require('./components/Calendar.jsx');
var InspectionReport = require('./components/InspectionReport.jsx');
var RtaForm = require('./components/RtaForm.jsx');
var Messages = require('./components/Messages.jsx');
var Login = require('./components/Login.jsx');
var CreateAccount = require('./components/CreateAccount.jsx');
var AuthedSection = require('./components/AuthedSection.jsx');
var UnauthedSection = require('./components/UnauthedSection.jsx');

require('../styles/main.scss');

var App = React.createClass({
  componentWillMount() {
    // material-ui components depend on this for touch event listening.
    injectTapEventPlugin();

    // If the root app component is being mounted, and a userId is cached,
    // then it means a refresh has occurred. Must repopulate user model.
    if (User.getUserId()) {
      Api.getUser({
        callback(err, response) { User.setUser(response.data); }
      });
    }
  },

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.props.children}
      </div>
    );
  }
});

React.render((
  <Router history={history}>
    <Router component={App}>
      <Router path="" component={UnauthedSection}>
        <Router path="/" component={Login} />
        <Router path="/createAccount" component={CreateAccount} />
      </Router>
      <Router path="" component={AuthedSection}>
        <Router path="propertyDetails" component={PropertyDetails} />
        <Router path="payments" component={Payments} />
        <Router path="repairRequest" component={RepairRequest} />
        <Router path="calendar" component={Calendar} />
        <Router path="inspectionReport" component={InspectionReport} />
        <Router path="rtaForm" component={RtaForm} />
        <Router path="messages" component={Messages} />
      </Router>
    </Router>
  </Router>
), document.getElementById('react'));
