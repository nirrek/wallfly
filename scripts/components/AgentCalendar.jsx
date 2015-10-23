var React = require('react');
var Radium = require('radium');
var Api = require('../utils/Api.js');
var Moment = require('moment');
var User = require('../utils/User.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUi = require('material-ui');

var Toolbar = MaterialUi.Toolbar;
var ToolbarGroup = MaterialUi.ToolbarGroup;
var ToolbarTitle = MaterialUi.ToolbarTitle;
var IconButton = MaterialUi.IconButton;
var List = MaterialUi.List;
var Snackbar = MaterialUi.Snackbar;

var CalendarListDay = require('./CalendarListDay.jsx');

var AgentCalendar = React.createClass({

  getInitialState() {
    return {
      month: Moment(),
      events: [],
      responseReceived: false,
      snackbarMsg: '',
    };
  },

  componentWillMount() {
    this.getEvents();
  },

  componentDidUpdate() {
    // Scroll calendar to today
    if (React.findDOMNode(this.refs.today)) {
      React.findDOMNode(this.refs.today).scrollIntoView(true);
    }

    // Hacky way to get width for fixed toolbar
    var width = React.findDOMNode(this.refs.days).clientWidth
    React.findDOMNode(this.refs.toolbar)
      .setAttribute('style', 'width: '+width+'px;position: fixed; z-index: 1;background:#bbb;margin-top:-1em;');
  },

  getEvents() {
    Api.getAllEvents({
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
    React.findDOMNode(this.refs.today).scrollIntoView();
  },

  refresh(snackbarMsg) {
    console.log(snackbarMsg);
    this.getEvents();
    this.setState({snackbarMsg: snackbarMsg});
    this.refs.snackbar.show();
  },

  groupByDay(events) {
    var obj = events.reduce((acc, d) => {
      var p = Moment(d.date).format('DD dddd');
      if (!acc[0].hasOwnProperty(p)) acc[0][p] = [];
      acc[0][p].push(d);
      return acc;
    }, [{}])
    .reduce((acc, v) => {
      Object.keys(v).forEach((k) => acc.push({ day: k, events: v[k] }));
      return acc;
    }, []);
    return obj;
  },

  render() {
    // Don't render the calendar till data call is complete
    if (!this.state.responseReceived) return null;

    var { month, events } = this.state;

    // Filter out the loaded months events and group by days
    var filteredRequests = events.filter((event) => Moment(event.date).isSame(month, 'month'));
    var groupedDays = this.groupByDay(filteredRequests);

    var days = groupedDays.map((day) => {
      var date = Moment(day.events[0].date);
      return (
        <div>
          <List
            subheader={day.day}
            subheaderStyle={date.isBefore(Moment(), 'day') ? style.past : style.upcoming }
            ref={date.isSame(Moment(), 'day') ? '' : 'today' }>
            <div>
              <CalendarListDay
              dayEvents={day.events}
              refresh={this.refresh} />
            </div>
          </List>
        </div>
      );
    });
    
    return (
      <div style={style.container}>
        <Toolbar style={style.toolbar} ref='toolbar'>
          <ToolbarGroup key={0} float="left">
            <IconButton style={style.arrowButtons}
              onClick={this.getPrevMonth}
              iconClassName="material-icons">keyboard_arrow_left</IconButton>
            <ToolbarTitle style={style.toolbarTitle}
              text={this.state.month.format('MMMM YYYY')} />
            <IconButton style={style.arrowButtons}
              onClick={this.getNextMonth}
              iconClassName="material-icons">keyboard_arrow_right</IconButton>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <IconButton style={style.arrowButtons}
              onClick={this.getToday}
              iconClassName="material-icons"
              tooltip="Today">today</IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div style={style.days} ref="days">
          {filteredRequests.length === 0 ?
            <p style={style.noEvents}>No events for this month.</p> :
            <div>{ days }</div>
          }
        </div>
        <Snackbar
          ref="snackbar"
          message={this.state.snackbarMsg}
          autoHideDuration={3000} />
      </div>
    );
  }
});

var style = {
  container: {
    paddingBottom: '3em',
  },
  toolbar: {
    position: 'fixed',
    zIndex: 1,
  },
  toolbarTitle: {
    paddingRight: '0',
    textAlign: 'center',
    width: '155px',
  },
  arrowButtons: {
    float: 'left',
    width: '56px',
    height: '56px',
  },
  days: {
    paddingTop: '40px',
  },
  noEvents: {
    color: '#ccc',
    fontStyle: 'italic',
  },
  past: {
    fontSize: '1.2em',
    color: '#FFFFFF',
    background: '#ccc',
  },
  upcoming: {
    background: '#2ECC71',
    fontSize: '1.2em',
    color: '#FFFFFF',
  },
};

module.exports = MuiContextified(Radium(AgentCalendar));
