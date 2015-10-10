var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Radium = require('radium');

var CalendarAddEventForm = React.createClass({
  propTypes: {
    eventAdded: React.PropTypes.func,
    propertyId: React.PropTypes.number,
  },

  getInitialState() {
    return {
      eventDesc: '', // User entered description
      date: '',
      time: '',
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

  /**
   * Form submission event handler. Sends a request to the server to add the
   * repair request, and updates the repair requests if successful.
   */
  onSubmit(event) {

    // API call to add repair request
    var propertyId = this.props.propertyId;
    console.log(propertyId);
    Api.addPropertyCalendarEvents({
      data: {
        eventDesc: this.state.eventDesc,
        date: this.state.date,
        time: this.state.time,
        propertyId: propertyId,
      },
      callback: (err, response) => {
        if (err) {
          return;
        }

        // Clear the form
        this.setState({
          eventDesc: '',
          date: '',
          time: '',
        });

        this.props.eventAdded();
        this.refs.dialog.dismiss();
      }
    });
  },

  render() {
    var { eventDesc, date, time } = this.state;
    var errorMessage;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Add Event', onTouchTap: this.onSubmit, ref: 'submit' }
    ];

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
            value={eventDesc}
            multiLine={true}
            name="Event Description"
            onChange={this.onChange.bind(this, 'eventDesc')}
            floatingLabelText="Event Description"
            hintText="Describe what will be happening at this event"
            fullWidth />
          <TextField
            value={date}
            name="Date"
            onChange={this.onChange.bind(this, 'date')}
            floatingLabelText="Date"
            hintText="Enter the date. (dd/mm/yyyy)" />
          <TextField
            value={time}
            name="Time"
            onChange={this.onChange.bind(this, 'time')}
            floatingLabelText="Time"
            hintText="Enter the time. (h:mm ampm)" />
        </Dialog>
      </div>
    );
  }
});

var style = {

};

module.exports = Radium(MuiContextified(CalendarAddEventForm));
