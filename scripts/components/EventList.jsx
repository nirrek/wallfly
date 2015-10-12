var React = require('react');
var Radium = require('radium');
var EventItem = require('./EventItem.jsx');

/**
 * Event List
 * This is a calendar component that lists events in the calendar days.
 */

var EventList = React.createClass({
  propTypes: {
    events: React.PropTypes.array.isRequired
  },

  render() {
    var eventEntries = this.props.events.map(event => {
      return (
        <div key={event.id}>
          <EventItem data={event} />
        </div>
      );
    });

    return (
      <div style={style.eventList}>{ eventEntries }</div>
    );
  },

});

var style = {
  eventList: {
    textAlign: 'left',
    color: '#000',
  }
}

module.exports = Radium(EventList);
