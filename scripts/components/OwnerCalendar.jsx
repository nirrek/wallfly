var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var WallflyCalendar = require('./WallflyCalendar.jsx');
var CalendarAddEventForm = require('./CalendarAddEventForm.jsx');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUi = require('material-ui');
var Snackbar = MaterialUi.Snackbar;
var RaisedButton = MaterialUi.RaisedButton;
var Radium = require('radium');

require('../../styles/DayPicker.scss');

/**
 * Owner Calendar
 * This is route endpoint component for the owner calendar view.
 */
var OwnerCalendar = React.createClass({
  getInitialState() {
    return {
      events: [], // list of calendar events
      isAddEventDialogOpen: false,
    };
  },

  componentWillMount() {
    this.getCalendarEvents();
  },

  getCalendarEvents() {
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
        });
        this.setState({ events: massagedEvents });
      }
    });
  },

  onAddEventClick() {
    this.setState({ isAddEventDialogOpen: true });
  },

  onClose() {
    this.setState({ isAddEventDialogOpen: false });
  },

  onEventAdded() {
    this.setState({ isAddEventDialogOpen: false });
    this.getCalendarEvents();
    this.refs.snackbar.show();
  },

  render() {
    return (
      <div>
        <RaisedButton primary={true} label="Add Event" onClick={this.onAddEventClick} />
        <CalendarAddEventForm
          isOpen={this.state.isAddEventDialogOpen}
          onClose={this.onClose}
          onEventAdded={this.onEventAdded}
          propertyId={this.props.params.propertyId} />
        <WallflyCalendar events={this.state.events} />

        <Snackbar
          ref="snackbar"
          message="Event Added"
          autoHideDuration={3000} />
      </div>
    );
  }
});

module.exports = MuiContextified(Radium(OwnerCalendar));
