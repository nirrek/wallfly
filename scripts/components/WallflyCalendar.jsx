var React = require('react');
var moment = require('moment');
var DayPicker = require('react-day-picker');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var List = mui.List;
var ListItem = mui.ListItem;
var ListDivider = mui.ListDivider;
var Radium = require('radium');

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
    var eventEntries = events.map(event => {
      return (
        <ListItem
          primaryText={event.event}
          secondaryText={event.date.format('h:mm a')}
          secondaryTextLines={1}
          />
      );
    });

    return (
      <div className="day" >
        { day.getDate() }
        <List>
          { eventEntries }
        </List>
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
};

var style = {

};

module.exports = Radium(MuiContextified(WallflyCalendar));
