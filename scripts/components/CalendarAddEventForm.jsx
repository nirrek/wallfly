var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Label = require('./Label.jsx');
var Radium = require('radium');
var Kronos = require('react-kronos');

var CalendarAddEventForm = React.createClass({
  propTypes: {
    eventAdded: React.PropTypes.func,
    propertyId: React.PropTypes.string,
  },

  getInitialState() {
    return {
      eventDesc: '', // User entered description
      date: new Date(),
      time: '',
      notes: '',
      validationError: null, // clientside validation error object
    };
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

    this.setState({
      validationError: undefined,
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.addPropertyCalendarEvents({
      data: {
        eventDesc: this.state.eventDesc,
        date: this.state.date,
        notes: this.state.notes,
        propertyId: propertyId,
      },
      callback: (err, response) => {
        if (err) {
        console.log(err);
        return reply(err);
      }

        // Clear the form
        this.setState({
          eventDesc: '',
          date: '',
          notes: '',
        });

        this.props.eventAdded();
        this.refs.dialog.dismiss();
      }
    });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      'Event Description': this.state.eventDesc,
      Date: this.state.date,
      Notes: this.state.notes,
    }, schema);
  },

  onKronosChange(date) {
    this.setState({ Date: date });
  },

  render() {
    var { eventDesc, date, time, notes, validationError } = this.state;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Add Event', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    var validationErrorMsg = validationError ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <div>
        <RaisedButton label="Add Event"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Add an Event"
          actions={standardActions}
          actionFocus="submit"
          modal="true"
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
          contentStyle={{width: 350}}
          ref="dialog">

          {validationErrorMsg}

          <TextField
            value={eventDesc}
            name="Event Description"
            onChange={this.onChange.bind(this, 'eventDesc')}
            floatingLabelText="Event Description"
            hintText="Short description of the event"
            fullWidth={true} />
          <br />
          <div style={styles.kronosContainer}>
            <Label>Date</Label>
            <Kronos
              date={date}
              onChange={this.onKronosChange}
              options={kronosOptions}
              format="DD/MM/YYYY"
              placeholder="Date" />
          </div>
          <div style={styles.kronosContainer}>
            <Label>Time</Label>
            <Kronos
              time={date}
              onChange={this.onKronosChange}
              options={kronosOptions}
              placeholder="Time" />
          </div>
          <div style={styles.notesContainer}>
            <TextField
              value={notes}
              multiLine={true}
              name="Notes"
              onChange={this.onChange.bind(this, 'notes')}
              floatingLabelText="Notes"
              hintText="Add more detailed notes here"
              fullWidth />
          </div>
        </Dialog>
      </div>
    );
  }
});

var kronosOptions = {
  color: '#2ECC71',
  font: 'Roboto',
};

var styles = {
  kronosContainer: {
    width: 196,
  },
  notesContainer: {
    minHeight: 200,
  },
};

// Validation schema for user profile form data.
var schema = Joi.object().keys({
  'Event Description': Joi.string().max(64).required(),
  Date: Joi.date(),
  Notes: Joi.string().max(1000).allow(''),
});

module.exports = Radium(MuiContextified(CalendarAddEventForm));
