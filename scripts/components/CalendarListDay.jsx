var React = require('react');
var Radium = require('radium');
var MuiContextified = require('./MuiContextified.jsx');
var CalendarListItem = require('./CalendarListItem.jsx');

/**
 * CalendarListDay Component
 * Component for an individual day in the list calendar.
 */
var CalendarListDay = React.createClass({
  propTypes: {
    dayEvents: React.PropTypes.array,
    refresh: React.PropTypes.func,
  },

  render() {
    var items = this.props.dayEvents.map((item) => {
      return(
        <div key={item.id}>
          <CalendarListItem event={item} refresh={this.props.refresh}/>
        </div>
      );
    });

    return (
      <div>
        { items }
      </div>
    );
  }
});

module.exports = MuiContextified(Radium(CalendarListDay));
