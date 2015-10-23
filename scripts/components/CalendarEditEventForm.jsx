var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUi = require('material-ui');
var TextField = MatterialUi.TextField;
var Dialog = MatterialUi.Dialog;
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Radium = require('radium');
var Kronos = require('react-kronos');

var CalendarEditEventForm = React.createClass({
  propTypes: {
    openEditForm: React.PropTypes.bool, // open the edit form
    details: React.PropTypes.object.isRequired, // event details
    onEventDetailsUpdated: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return this.props.details;
  },

  componentWillReceiveProps() {
    // Clear prior error states.
    this.setState({
      validationError: false,
      authFailure: '',
    });
  },

  componentDidUpdate() {
    // Check if form has been called to open
    if (this.props.openEditForm) {
        this.refs.editDialog.show();
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
      authFailure: '',
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
          this.setState({ authFailure: msg });
          return;
        }
        this.refs.editDialog.dismiss();
        this.props.onEventDetailsUpdated(this.state.event);
      }
    });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      date: this.state.date,
      event: this.state.event,
      notes: this.state.notes,
    }, schema);
  },

  render() {
    // Only render form if there is call for it to appear
    if (!this.props.openEditForm) return null;

    var { date, event, notes, authFailure, validationError } = this.state;

    var standardActions = [
      { text: 'Cancel' },
      { text: 'Update event', onTouchTap: this.onSubmit, ref: 'submit' }
    ];

    var authFailMessage = authFailure ? (
      <ErrorMessage fillBackground={true}>{authFailure}</ErrorMessage>
    ) : null;

    // Form validation error
    var validationErrorMessage = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <div>
        <Dialog
          title="Edit the Event"
          actions={standardActions}
          actionFocus="submit"
          modal={true}
          ref="editDialog">
          {validationErrorMessage}
          {authFailMessage}
          <TextField
            value={event}
            name="Event Description"
            onChange={this.onChange.bind(this, 'event')}
            floatingLabelText="Event Description"
            hintText="Short description of the event" /><br />
          <Label>Date</Label>
          <Kronos
            date={this.state.date}
            format='D/MM/YYYY'
            onChange={this.onDateChange}
          />
        <Label>Time</Label>
          <Kronos
            time={this.state.date}
            onChange={this.onDateChange}
          />
          <TextField
            value={notes}
            multiLine={true}
            name="Notes"
            onChange={this.onChange.bind(this, 'notes')}
            floatingLabelText="Notes"
            hintText="Add more detailed notes here (1000 characters max)"
            fullWidth />
        </Dialog>
      </div>
    );
  }
});

// Validation schema for update property form data.
var schema = Joi.object().keys({
  date: Joi.date(),
  event: Joi.string().max(64).required(),
  notes: Joi.string().max(1000).allow(['', null]),
});

module.exports = MuiContextified(Radium(CalendarEditEventForm));
