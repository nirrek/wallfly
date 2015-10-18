var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var history = require('react-router/lib/BrowserHistory').history;
var injectTapEventPlugin = require('react-tap-event-plugin');
var mui = require('material-ui');
var User = require('./utils/User.js');
var Property = require('./utils/Property.js');
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
var UnauthedSection = require('./components/UnauthedSection.jsx');
var AppFrame = require('./components/AppFrame.jsx');
var Page = require('./components/Page.jsx');
var NavigationList = require('./components/Navigation.jsx');
var PropertyNav = require('./components/PropertyNav.jsx');
var OwnerNav = require('./components/OwnerNav.jsx');
var PropertyList = require('./components/PropertyList.jsx');
var OwnerPropertyDetails = require('./components/OwnerPropertyDetails.jsx');
var OwnerPayments = require('./components/OwnerPayments.jsx');
var OwnerRepairRequests = require('./components/OwnerRepairRequests.jsx');
var OwnerInspectionReports = require('./components/OwnerInspectionReports.jsx');
var OwnerCalendar = require('./components/OwnerCalendar.jsx');
var AgentNav = require('./components/AgentNav.jsx');
var Chat = require('./components/Chat.jsx');
var AgentMessages = require('./components/AgentMessages.jsx');
var OwnerMessages = require('./components/OwnerMessages.jsx');
var TenantPropertyDetails = require('./components/TenantPropertyDetails.jsx');
var RepairRequestAggregator = require('./components/RepairRequestAggregator.jsx');

require('../styles/main.scss');

var App = React.createClass({
  componentWillMount() {
    // material-ui components depend on this for touch event listening.
    injectTapEventPlugin();

    // If the root app component is being mounted, and a userId is cached,
    // then it means a refresh has occurred. Must repopulate user model.
    if (User.getUserId()) {
      Api.getUser({
        callback(err, response) {
          User.setUser(response.data);

          if (User.getUser().type === 'tenant') {
            Api.getUserPropertyDetails({
              callback: (err, response) => {
                if (err) return console.log(err);
                Property.setProperty(response.data);
              }
            });
          }
        }
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

/**
 * Placeholder for pages that are yet to be setup completely.
 */
var Stub = React.createClass({
  render() {
    return <div>Stub</div>;
  }
});

// AppFrame's onEnter method for redirecting the user if not authed.
var redirectUnauthedUser = function(nextState, transition) {
  if (!User.getUserId()) transition.to('/');
}

React.render((
  <Router history={history}>
    <Route component={App}>
      <Route path="" component={UnauthedSection}>
        <Route path="/" component={Login} />
        <Route path="/createAccount" component={CreateAccount} />
      </Route>
      <Route path="" component={AppFrame} onEnter={redirectUnauthedUser}>
        <Route path="owner" components={{ main: Page, sidebar: OwnerNav }}>
          <Route path="propertyList" component={PropertyList} />
          <Route path="messages" component={OwnerMessages} />
        </Route>
        {/* Property subroutes can't be nested, as we need to be able to specify sidbar component */}
        <Route path="owner/property/:propertyId" components={{ main: Page, sidebar: PropertyNav }}>
          <Route path="propertyDetails" component={OwnerPropertyDetails} />
          <Route path="payments" component={OwnerPayments} />
          <Route path="repairRequests" component={OwnerRepairRequests} />
          <Route path="inspectionReports" component={OwnerInspectionReports} />
          <Route path="calendar" component={OwnerCalendar} />
        </Route>

        <Route path="agent" components={{ main: Page, sidebar: AgentNav }}>
          <Route path="propertyList" component={PropertyList} />
          <Route path="calendar" component={Stub} />
          <Route path="repairRequests" component={RepairRequestAggregator} />
        </Route>
        {/* Property subroutes can't be nested, as we need to be able to specify sidbar component */}
        <Route path="agent/property/:propertyId" components={{ main: Page, sidebar: PropertyNav }}>
          <Route path="propertyDetails" component={OwnerPropertyDetails} />
          <Route path="payments" component={OwnerPayments} />
          <Route path="repairRequests" component={OwnerRepairRequests} />
          <Route path="inspectionReports" component={OwnerInspectionReports} />
          <Route path="calendar" component={OwnerCalendar} />
          <Route path="messages" component={AgentMessages} />
        </Route>

        <Route path="tenant" components={{ main: Page, sidebar: NavigationList }}>
          <Route path="propertyDetails" component={TenantPropertyDetails} />
          <Route path="payments" component={Payments} />
          <Route path="repairRequest" component={RepairRequest} />
          <Route path="calendar" component={Calendar} />
          <Route path="inspectionReport" component={InspectionReport} />
          <Route path="rtaForm" component={RtaForm} />
          <Route path="messages" component={Messages} />
        </Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('react'));
