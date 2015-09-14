var React = require('react');
var moment = require('moment');
var DayPicker = require('react-day-picker');
var Api = require('../utils/Api.js');
var WallflyCalendar = require('./WallflyCalendar.jsx');

require('../../styles/DayPicker.scss');

/**
 * Owner Calendar
 * This is route endpoint component for the owner calendar view.
 */
var OwnerCalendar = React.createClass({
  getInitialState() {
    return {
      events: [], // list of calendar events
    };
  },

  componentWillMount() {
    var { propertyId } = this.props.params;

    Api.getPropertyCalendarEvents({
      propertyId: propertyId,
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

  render() {
    return (
      <div>
        <WallflyCalendar events={this.state.events} />
      </div>
    );
  }
});

module.exports = OwnerCalendar;
