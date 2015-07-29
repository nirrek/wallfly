import React from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import Sidebar from 'react-sidebar';
import Header from './components/Header.react.jsx';
import NavigationList from './components/Navigation.react.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';
let ThemeManager = new mui.Styles.ThemeManager();
import PropertyDetails from './components/PropertyDetails.react.jsx';
import Payments from './components/Payments.react.jsx';
import RepairRequest from './components/RepairRequest.react.jsx';
import Calendar from './components/Calendar.react.jsx';
import InspectionReport from './components/InspectionReport.react.jsx';
import RtaForm from './components/RtaForm.react.jsx';
import Messages from './components/Messages.react.jsx';

require('../styles/main.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      isSidebarDocked: true,
    }
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    this.mql = window.matchMedia(`(min-width: 800px)`);
    this.mql.addListener(this.mediaQueryChanged);
    this.setState({ isSidebarDocked: this.mql.matches });

    // material-ui components depend on this for touch event listening.
    injectTapEventPlugin();
  }

  componentWillUnmount() {
    this.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.setState({ isSidebarDocked: this.mql.matches });
  }

  onSetSidebarOpen = (isOpen) => {
    this.setState({ isSidebarOpen: isOpen });
  }

  openMenu = () => {
    this.setState({ isSidebarOpen: true });
  }

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
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render((
  <Router history={history}>
    <Router path="/" component={App}>
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
