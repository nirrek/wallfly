var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Label = require('./Label.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');
var Radium = require('radium');
var Kronos = require('react-kronos');

var CalendarAddEventForm = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired,
    onEventAdded: React.PropTypes.func,
    propertyId: React.PropTypes.string,
  },

  getInitialState() {
    return {
      eventDesc: '', // User entered description
      date: (new Date()).toISOString(),
      time: '',
      notes: '',
      validationError: null, // clientside validation error object
    };
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
  onSubmit() {
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
        if (err) return console.log(err);

        this.resetState();
        this.props.onEventAdded();
      }
    });
  },

  onClose() {
    this.resetState();
    this.props.onClose();
  },

  // Resets state of the form.
  resetState() {
    this.setState({
      eventDesc: '',
      date: (new Date()).toISOString(),
      notes: '',
      validationError: false,
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
    console.log(date);
    this.setState({ date: date });
  },

  render() {
    var { eventDesc, date, notes, validationError } = this.state;
    var standardActions = [
      { text: 'Cancel', onTouchTap: this.onClose },
      { text: 'Add Event', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    var validationErrorMsg = validationError ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <div>
        <DialogEnhanced
          isOpen={this.props.isOpen}
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
        </DialogEnhanced>
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

module.exports = MuiContextified(Radium(CalendarAddEventForm));
