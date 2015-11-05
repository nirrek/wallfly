var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var WallflyCalendar = require('./WallflyCalendar.jsx');
var Radium = require('radium');

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
          return;
        }

        var massagedEvents = response.data.map(event => {
          event.date = moment(event.date);
          return event;
        });
        this.setState({ events: massagedEvents });
      }
    });
  },

  render() {
    return (
      <div style={style.page}>
        <WallflyCalendar events={this.state.events} />
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
};

module.exports = Radium(Calendar);
