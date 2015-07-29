import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';

require('../../styles/DayPicker.scss');

let events = [
  { date: new Date(2015, 6, 22), title: 'Fans being installed' }
];

const modifiers = {
  "firstOfMonth": (day) => day.getDate() === 1,
}

class Calendar extends React.Component {
  renderDay = (day) => {
    let events = this.getEventsForDay(day);
    let eventsEntries = events.map(event => {
      return (
        <div key={day.getTime()}>
          {event.title}
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
    let eventsForDay = [];
    events.forEach(event => {
      if (event.date.getTime() === day.getTime()) eventsForDay.push(event);
    });
    return eventsForDay;
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

// class Calendar extends React.Component {
//   static defaultProps = {
//     year: 2015,
//     month: 6,
//   }

//   state = {
//     moment: moment([this.props.year, this.props.month, 1])
//   }

//   addMonth = () => { this.modifyMonth('add'); }
//   subtractMonth = () => { this.modifyMonth('subtract'); }

//   modifyMonth(action) {
//     let newMoment = moment(this.state.moment[action](1, 'month'));
//     this.setState({ moment: newMoment });
//   }

//   render() {
//     let { moment } = this.state;
//     let daysInMonth = moment.daysInMonth();
//     let daysRange = Array.from(new Array(daysInMonth), (el, idx) => idx + 1);

//     let dayComponents = daysRange.map(day => {
//       return (
//         <tr key={day}>
//           <td style={style.table.td}>{day}</td>
//           <td style={style.table.td}>{day % 7 === 0 ? 'some event' : null}</td>
//         </tr>
//       )
//     });

//     return (
//       <div style={style.page}>
//         Calendar: {moment.format('MMM YYYY')}
//         <button onClick={this.addMonth}>Increment Month</button>
//         <button onClick={this.subtractMonth}>Decrement Month</button>
//         <table>
//           <tbody>
//             {dayComponents}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

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
