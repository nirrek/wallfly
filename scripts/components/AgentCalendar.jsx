var React = require('react');
var Radium = require('radium');
var Api = require('../utils/Api.js');
var Moment = require('moment');
var User = require('../utils/User.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUI = require('material-ui');

var Toolbar = MaterialUI.Toolbar;
var ToolbarGroup = MaterialUI.ToolbarGroup;
var ToolbarTitle = MaterialUI.ToolbarTitle;
var IconButton = MaterialUI.IconButton;

var CalendarListDay = require('./CalendarListDay.jsx');

var AgentCalendar = React.createClass({
  propTypes: {
  },

  getInitialState() {
    return {
      month: Moment(),
      events: [],
      responseReceived: false,
    };
  },

  componentWillMount() {
    this.getEvents();
  },

  getEvents() {
    Api.getEvents({
      params: {
        agentId: User.getUser().id,
      },
      callback: (err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        this.setState({
          events: res.data,
          responseReceived: true,
        });
      }
    });
  },

  getPrevMonth() {
    var newMonth = this.state.month.subtract('1', 'months');
    this.setState({month: newMonth});
  },

  getNextMonth() {
    var newMonth = this.state.month.add('1', 'months');
    this.setState({month: newMonth});
  },

  getToday() {
    this.setState({month: Moment()});
  },

  render() {
    if (!this.state.responseReceived) return null;
    var { month, events } = this.state;

    var filteredRequests = events.filter((event) => Moment(event.date).isSame(month, 'month'));

    return (
      <div>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <IconButton style={style.ArrowButtons} onClick={this.getPrevMonth} iconClassName="material-icons">keyboard_arrow_left</IconButton>
            <ToolbarTitle style={style.ToolbarTitle} text={this.state.month.format('MMMM YYYY')} />
            <IconButton style={style.ArrowButtons} onClick={this.getNextMonth} iconClassName="material-icons">keyboard_arrow_right</IconButton>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton style={style.ArrowButtons} onClick={this.getToday} iconClassName="material-icons" tooltip="Today">today</IconButton>
          </ToolbarGroup>
        </Toolbar>

        <CalendarListDay events={filteredRequests} refresh={this.getEvents} />
      </div>
    );
  }
});

var style = {
  ToolbarTitle: {
    paddingRight: '0',
    textAlign: 'center',
    width: '155px',
  },
  ArrowButtons: {
    float: 'left',
    width: '56px',
    height: '56px',
  }
};

module.exports = MuiContextified(Radium(AgentCalendar));
