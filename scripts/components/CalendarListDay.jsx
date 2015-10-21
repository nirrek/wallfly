var React = require('react');
var Radium = require('radium');
var Moment = require('moment');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUI = require('material-ui');

var List = MaterialUI.List;
var CalendarListItem = require('./CalendarListItem.jsx');

var CalendarListDay = React.createClass({
  propTypes: {
    events: React.PropTypes.array,
    refresh: React.PropTypes.func
  },

  groupByDay() {
    var events = this.props.events;
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
    var dayEvents = this.groupByDay();
    var eventItems = dayEvents.map((days) => {
      var event = days.events.map((item) => {
        return (
          <div key={item.id}>
            <CalendarListItem event={item} refresh={this.props.refresh}/>
          </div>
        );
      });
      return (
        <div key={days.day}>
          <List key={days.day} subheader={days.day} subheaderStyle={style.subheader}>
            { event }
          </List>
        </div>
      );
    });

    return (
      <div>
        { eventItems }
      </div>
    );
  }
});

var style = {
  subheader: {
    fontSize: '1.2em',
    color: '#FFFFFF',
    background: '#2ECC71',
  },

};

module.exports = MuiContextified(Radium(CalendarListDay));
