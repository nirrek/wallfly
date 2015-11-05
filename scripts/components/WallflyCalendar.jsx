var React = require('react');
var moment = require('moment');
var DayPicker = require('react-day-picker');
var EventList = require('./EventList.jsx');
var Radium = require('radium');

require('../../styles/DayPicker.scss');

/**
 * Wallfly Calendar component.
 * This wraps the react-day-picker component rendering in a manner fit for
 * Wallfly. Consumes an array of events objects.
 */
var WallflyCalendar = React.createClass({
  propTypes: {
    events: React.PropTypes.array.isRequired
  },

  /**
   * Renders a particular day's cell for the calendar.
   * @param  {Object} day       The data model of the day to render.
   * @return {ReactElement}     vDOM tree of the rendered day.
   */
  renderDay(day) {
    var dayEvents = this.getEventsForDay(day);

    return (
      <div className="day" >
        { day.getDate() }
        <EventList events={dayEvents} />
      </div>
    );
  },

  /**
   * Returns a list of events for the given day.
   * @param  {Date} day The day to fetch the events for.
   * @return {Array}    List of events for the given day.
   */
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

/**
 * Modifier object specifies what <DayPicker> inteprets particular days as.
 */
var modifiers = {
  'firstOfMonth': (day) => day.getDate() === 1,
};

module.exports = Radium(WallflyCalendar);
