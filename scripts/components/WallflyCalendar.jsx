var React = require('react');
var moment = require('moment');
var DayPicker = require('react-day-picker');

require('../../styles/DayPicker.scss');

/**
 * Wallfly Calendar component.
 * This wraps the react-day-picker component rendering in a manner fit for
 * wallfly. Consumes an array of events objects.
 */
var WallflyCalendar = React.createClass({
  propTypes: {
    events: React.PropTypes.array.isRequired
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
    return this.props.events.filter((event) => event.date.isSame(day, 'day'));
  },

  render() {
    return (
      <DayPicker enableOutsideDays={true}
                 renderDay={this.renderDay}
                 modifiers={modifiers} />
    );
  }
});

// Modifiers specify what <DayPicker> inteprets particular days as.
var modifiers = {
  "firstOfMonth": (day) => day.getDate() === 1,
}

module.exports = WallflyCalendar;
