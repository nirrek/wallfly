var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var ImageSelector = require('./ImageSelector.jsx');
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');
var Radium = require('radium');
var Kronos = require('react-kronos');

/**
 * UpdatePropertyForm Component.
 * Dialog component for updating a given property's details.
 */
var UpdatePropertyForm = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    details: React.PropTypes.object.isRequired, // property details
    onPropertyDetailsUpdated: React.PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      onClose: () => {}
    };
  },

  getInitialState() {
    return {
      ...this.props.details,
      validationError: false,
      authFailure: '',
      fileSizeError: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.details });
  },

  /**
   * Close dialog event handler.
   */
  onClose() {
    this.resetState();
    this.props.onClose();
  },

  /**
   * Resets the error state of the form.
   */
  resetState() {
    this.setState({
      validationError: false,
      authFailure: '',
      fileSizeError: ''
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
   * Form submission event handler. Sends a request to the server to
   * update the property details. Updates the property details on success.
   */
  onSubmit() {
    // Clear prior error states.
    this.setState({
      validationError: false,
      authFailure: '',
      fileSizeError: ''
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    Api.updatePropertyDetails({
      data: {
        propertyId: this.state.id,
        tenantEmail: this.state.tenantEmail,
        leaseExpiry: this.state.leaseExpiry,
        ownerEmail: this.state.ownerEmail,
        street: this.state.street,
        suburb: this.state.suburb,
        postcode: this.state.postcode,
        photo: this.state.photo,
      },
      callback: (err, response) => {
        if (err) {
          var msg = (response.status === 0)
            ? 'Connection timed-out. Please try again.'
            : response.data;
          this.setState({ authFailure: msg });
          return;
        }
        this.props.onPropertyDetailsUpdated();
      }
    });
  },

  /**
   * Validate the form, returns the Joi result of the validation.
   * @return {Object} Joi validation object.
   */
  validate() {
    return Joi.validate({
      tenantEmail: this.state.tenantEmail,
      leaseExpiry: this.state.leaseExpiry,
      ownerEmail: this.state.ownerEmail,
      street: this.state.street,
      suburb: this.state.suburb,
      postcode: this.state.postcode,
      photo: this.state.photo,
    }, schema);
  },

  /**
   * Image selected event handler
   * @param  {Object} payload JS File API payload of selected file.
   */
  onImageSelected(payload) {
    this.setState({ photo: payload.dataURL });
  },

  /**
   * Image size error event handler.
   * @param  {Object} error The error object.
   */
  onImageSizeError(error) {
    var file = error.file;
    var sizeLimit = error.sizeLimit / 1000; // in KB (base10)
    var errorMessage = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: errorMessage });
  },

  /**
   * Kronos datepicker date selected event handler.
   * @param  {Date} Date selected.
   */
  onKronosChange(date) {
    this.setState({ leaseExpiry: date });
  },

  /**
   * Tenant email text field on blur event handler.
   * Ensure the lease expiry is empty if no tenant was specified.
   * @param  {Object} event The event object.
   */
  onBlurTenantEmail(event) {
    if (!event.target.value) {
      this.setState({ leaseExpiry: '' });
    }
  },

  render() {
    var { street, suburb, postcode, ownerEmail, tenantEmail, fileSizeError, photo, authFailure, validationError, leaseExpiry } = this.state;
    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;

    var standardActions = [
      { text: 'Cancel', onTouchTap: this.onClose },
      { text: 'Update Details', onTouchTap: this.onSubmit, ref: 'submit' }
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
        <DialogEnhanced isOpen={this.props.isOpen}
                        title="Edit Details"
                        autoScrollBodyContent={true}
                        autoDetectWindowHeight={true}
                        contentStyle={{width: 450}}
                        actions={standardActions}>
          {validationErrorMessage}
          {authFailMessage}
          <TextField
            value={street}
            name="Street Address"
            onChange={this.onChange.bind(this, 'street')}
            floatingLabelText="Street Address" />
          <TextField
            value={suburb}
            name="Suburb"
            onChange={this.onChange.bind(this, 'suburb')}
            floatingLabelText="Suburb" />
          <TextField
            value={postcode}
            name="Postcode"
            onChange={this.onChange.bind(this, 'postcode')}
            floatingLabelText="Postcode" />
          <TextField
            value={ownerEmail}
            name="Owner Email"
            onChange={this.onChange.bind(this, 'ownerEmail')}
            floatingLabelText="Owner Email"
            fullWidth />
          <TextField
            value={tenantEmail}
            onBlur={this.onBlurTenantEmail}
            name="Tenant Email"
            onChange={this.onChange.bind(this, 'tenantEmail')}
            floatingLabelText="Tenant Email (Leave blank to remove current tenant)"
            fullWidth />
          <div style={style.kronosContainer}>
            <Kronos
              date={leaseExpiry}
              format="DD/MM/YYYY"
              placeholder="Lease expiry date (optional)"
              options={{
                color: '#2ECC71',
                font: 'Roboto',
              }}
              returnAs="ISO"
              onChange={this.onKronosChange} />
          </div>
          <div>
            <Label>Image (Not Required)</Label>
            {sizeError}
            <ImageSelector image={photo}
                           onImageSelected={this.onImageSelected}
                           onImageSizeError={this.onImageSizeError} />
          </div>
        </DialogEnhanced>
      </div>
    );
  }
});

/**
 * Joi validation schema for form data.
 */
var schema = Joi.object().keys({
  tenantEmail: Joi.string().email().max(255).allow(['', null]),
  leaseExpiry: Joi.date().iso().allow(['', null]),
  ownerEmail: Joi.string().email().max(255),
  street: Joi.string().min(1).max(500),
  suburb: Joi.string().min(1).max(500),
  postcode: Joi.string().min(4).max(4),
  photo: Joi.string(),
});

var style = {
  kronosContainer: {
    marginTop: '1em',
    width: 220,
  }
};

module.exports = MuiContextified(Radium(UpdatePropertyForm));
