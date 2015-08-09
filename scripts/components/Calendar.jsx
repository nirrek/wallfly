var React = require('react');
var moment = require('moment');
var DayPicker = require('react-day-picker');
var Api = require('../utils/Api.js');

require('../../styles/DayPicker.scss');

/**
 * Calendar component.
 * The calendar component provides a calendar view that contains
 * important events for the user.
 */
var Calendar = React.createClass({
  getInitialState() {
    return {
      events: [], // list of calendar events
    };
  },

  componentWillMount() {
    Api.getEvents({
      callback: (err, response) => {
        if (err) {
          // TODO
          return;
        }

        var massagedEvents = response.data.map(event => {
          event.date = moment(event.date);
          return event;
        })
        this.setState({ events: massagedEvents });
      }
    })
  },

  renderDay(day) {
    var events = this.getEventsForDay(day);
    var eventsEntries = events.map(event => {
      return (
        <div key={day.getTime()}>
          {event.event}
        </div>
      );
    });

    return (
      <div className="day">
        { day.getDate() }
        { eventsEntries }
      </div>
    );
  },

  getEventsForDay(day) {
    day = moment(day);
    return this.state.events.filter((event) => event.date.isSame(day, 'day'));
  },

  render() {
    return (
      <div style={style.page}>
        <DayPicker enableOutsideDays={true}
                   renderDay={this.renderDay}
                   modifiers={modifiers} />
      </div>
    );
  }
});

// Modifiers specify what <DayPicker> inteprets particular days as.
var modifiers = {
  "firstOfMonth": (day) => day.getDate() === 1,
}

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  table: {
    td: {
      padding: '.5em',
    }
  }
};

module.exports = Calendar;
