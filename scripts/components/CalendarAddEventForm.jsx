var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var ImageSelector = require('./ImageSelector.jsx');
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var DatePicker = mui.DatePicker;
var TimePicker = mui.TimePicker;

var CalendarAddEventForm = React.createClass({
  propTypes: {
    EventAdded: React.PropTypes.func,
    propertyID: React.PropTypes.number
  },

  getInitialState() {
    return {
      eventdesc: '', // User entered description
      startDateTime: new Date(),
      endDateTime: new Date(),
    }
  },

  onButtonClick() {
    this.refs.dialog.show();
  },

  /**
   * Event handler for capturing in the input field state on each keypress.
   * @param  {String} field The identifier for the input field.
   */
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  onStartDateChange(nill, dateobj) {
    var updated = new Date(dateobj.toDateString()
                    +" "+this.state.startDateTime.toTimeString());
    this.setState({startDateTime: updated});
  },

  onStartTimeChange(nill, dateobj) {
    var updated = new Date(this.state.startDateTime.toDateString()
                    +" "+dateobj.toTimeString());
    this.setState({startDateTime: updated});
  },

  onEndDateChange(nill, dateobj) {
    var updated = new Date(dateobj.toDateString()
                    +" "+this.state.endDateTime.toTimeString());
    this.setState({endDateTime: updated});
  },

  onEndTimeChange(nill, dateobj) {
    var updated = new Date(this.state.endDateTime.toDateString()
                    +" "+dateobj.toTimeString());
    this.setState({endDateTime: updated});
  },

  /**
   * Form submission event handler. Sends a request to the server to add the
   * repair request, and updates the repair requests if successful.
   */
  onSubmit(event) {

    // API call to add repair request
    var propertyId = this.props.propertyID;
    Api.addPropertyCalendarEvents({
      data: {
        eventdesc: this.state.eventdesc,
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime,
        propertyId: this.props.propertyID,
      },
      callback: (err, response) => {
        if (err) {
          return;
        }

        // Clear the form
        this.setState({
          eventdesc: '', // User entered description
          startDateTime: new Date(),
          endDateTime: new Date(),
        });

        this.props.EventAdded();
        this.refs.dialog.dismiss();
      }
    });
  },

  render() {
    var { eventdesc, startDateTime, endDateTime } = this.state;
    var errorMessage;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Add Event', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    function roundMinutes(date) {
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0);
        return date;
    }
    function addHour(date) {
      date.setHours(date.getHours() + 1);
      return date;
    }
    return (
      <div style={style.formContainer}>
        <RaisedButton label="Add Event"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Add an Event"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          <div style={style.error}> { errorMessage } </div>
          <TextField
            value={eventdesc}
            multiLine={true}
            name="Comments"
            onChange={this.onChange.bind(this, 'eventdesc')}
            floatingLabelText="Description"
            hintText="Describe what will be happening at this event"
            fullWidth />
          <Label>Starts</Label>
          <DatePicker
            value={this.state.startDateTime}
            hintText="Date"
            mode="landscape"
            onChange={this.onStartDateChange}
            ref="startdate" />
          <TimePicker
            hintText="Time"
            format="ampm"
            onChange={this.onStartTimeChange}
            ref="starttime" />
          <Label>Ends</Label>
          <DatePicker
            value={this.state.endDateTime}
            hintText="Date"
            mode="landscape"
            onChange={this.onEndDateChange}
            ref="enddate" />
          <TimePicker
            hintText="Time"
            format="ampm"
            onChange={this.onEndTimeChange}
            ref="endtime" />
        </Dialog>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  formContainer: {
    width: '325px',
  },
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  inputContainer: {
    margin: '40px 0'
  },
  img: {
    maxWidth: 200,
  },
  heading: {
    margin: 0
  }
};

module.exports = MuiContextified(CalendarAddEventForm);
