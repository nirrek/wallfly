var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUi = require('material-ui');
var TextField = MaterialUi.TextField;
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');
var Radium = require('radium');
var Kronos = require('react-kronos');

/**
 * CalendarEditEventForm Component.
 * Modal component for editing an event.
 */
var CalendarEditEventForm = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    details: React.PropTypes.object.isRequired, // event details
    onEventDetailsUpdated: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      ...this.props.details,
      event: '',
      notes: '',
      date: undefined,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.details });
  },

  /**
   * Close event handler for the modal.
   */
  onClose() {
    this.resetState();
    this.props.onClose();
  },

  /**
   * Clears the state of the form
   */
  resetState() {
    this.setState({
      validationError: false,
      serverError: '',
    });
  },

  /**
   * Event handler for capturing in the input field state on each keypress.
   * @param  {String} field The identifier for the input field.
   */
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  /**
   * Kronos helper function to set datetime for the event
   * @param  {Date} from the Kronos component
   */
  onDateChange(newDate) {
    this.setState({ date: newDate });
  },

  /**
   * Form submission event handler. Sends a request to the server to add the
   * event, and updates the event if successful.
   */
  onSubmit() {
    // Clear prior error states.
    this.setState({
      validationError: false,
      serverError: '',
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.updateEvent({
      data: {
        id: this.state.id,
        date: this.state.date,
        event: this.state.event,
        notes: this.state.notes,
        propertyId: this.state.propertyId,
      },
      callback: (err, response) => {
        if (err) {
          var msg = (response.status === 0)
            ? 'Connection timed-out. Please try again.'
            : response.data;
          this.setState({ serverError: msg });
          return;
        }

        this.resetState();
        this.props.onEventDetailsUpdated(this.state.event);
      }
    });
  },

  /**
   * Validates the form; returns the Joi result of the validation.
   * @return {Object} Joi validation object.
   */
  validate() {
    return Joi.validate({
      date: this.state.date,
      event: this.state.event,
      notes: this.state.notes,
    }, schema);
  },

  render() {
    var { date, event, notes, serverError, validationError } = this.state;

    var standardActions = [
      { text: 'Cancel', onTouchTap: this.onClose },
      { text: 'Update event', onTouchTap: this.onSubmit, ref: 'submit' }
    ];

    var serverErrorMessage = serverError ? (
      <ErrorMessage fillBackground={true}>{serverError}</ErrorMessage>
    ) : null;

    // Form validation error
    var validationErrorMessage = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <div>
        <DialogEnhanced
          isOpen={this.props.isOpen}
          title="Edit the Event"
          actions={standardActions}
          actionFocus="submit"
          modal={true}
          contentStyle={{width: 450}}
          ref="editDialog">
          {validationErrorMessage}
          {serverErrorMessage}
          <TextField
            value={event}
            name="Event Description"
            onChange={this.onChange.bind(this, 'event')}
            floatingLabelText="Event Description"
            hintText="Short description of the event"
            fullWidth={true} /><br />
          <Label>Date</Label>
          <div style={styles.kronosContainer}>
            <Kronos
              date={this.state.date}
              format='D/MM/YYYY'
              onChange={this.onDateChange}
              options={kronosOptions}
            />
          </div>
          <Label>Time</Label>
          <div style={styles.kronosContainer}>
            <Kronos
              time={this.state.date}
              onChange={this.onDateChange}
              options={kronosOptions}
            />
          </div>
          <div style={styles.notesContainer}>
            <TextField
              value={notes}
              multiLine={true}
              name="Notes"
              onChange={this.onChange.bind(this, 'notes')}
              floatingLabelText="Notes"
              hintText="Add more detailed notes here (1000 characters max)"
              fullWidth={true} />
          </div>
        </DialogEnhanced>
      </div>
    );
  }
});

/**
 * Configuration options for the kronos datepicker component.
 */
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

/**
 * Joi validation schema for event form data.
 */
var schema = Joi.object().keys({
  date: Joi.date(),
  event: Joi.string().max(64).required(),
  notes: Joi.string().max(1000).allow(['', null]),
});

module.exports = MuiContextified(Radium(CalendarEditEventForm));
