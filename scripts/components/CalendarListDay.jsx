var React = require('react');
var Radium = require('radium');
var Moment = require('moment');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUI = require('material-ui');

var CalendarListItem = require('./CalendarListItem.jsx');

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

var style = {


};

module.exports = MuiContextified(Radium(CalendarListDay));
