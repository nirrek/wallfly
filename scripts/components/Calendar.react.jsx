import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
var axios = require('axios');
var fecha = require('fecha');
var config = require('../utils/config.js');

// simulate a user Store
var user = {
  id: 5,
}

require('../../styles/DayPicker.scss');

let events = [
  { date: new Date(2015, 6, 22), title: 'Fans being installed' }
];

const modifiers = {
  "firstOfMonth": (day) => day.getDate() === 1,
}

class Calendar extends React.Component {
  state = {
    events: [], // list of calendar events
  }

  componentWillMount() {
    axios.get(`${config.server}/users/${user.id}/events`, {
      withCredentials: true
    })
    .then((response) => {
      let massagedEvents = response.data.map(event => {
        event.date = moment(event.date);
        return event;
      })
      this.setState({ events: massagedEvents });
    })
    .catch((response) => {
      // TODO error handling
    });
  }

  renderDay = (day) => {
    let events = this.getEventsForDay(day);
    let eventsEntries = events.map(event => {
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
  }

  getEventsForDay(day) {
    day = moment(day);
    return this.state.events.filter((event) => event.date.isSame(day, 'day'));
  }

  render() {
    return (
      <div style={style.page}>
        <DayPicker enableOutsideDays={true}
                   renderDay={this.renderDay}
                   modifiers={modifiers} />
      </div>
    );
  }
}

let style = {
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

export default Calendar;
