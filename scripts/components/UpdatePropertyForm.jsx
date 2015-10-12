var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var ImageSelector = require('./ImageSelector.jsx');
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Radium = require('radium');

var UpdatePropertyForm = React.createClass({
  propTypes: {
    details: React.PropTypes.object.isRequired, // property details
    onPropertyDetailsUpdated: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return this.props.details;
  },

  onButtonClick() {
    // Clear prior error states.
    this.setState({
      validationError: false,
      authFailure: '',
      fileSizeError: ''
    });

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
        this.refs.dialog.dismiss();
      }
    });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      tenantEmail: this.state.tenantEmail,
      ownerEmail: this.state.ownerEmail,
      street: this.state.street,
      suburb: this.state.suburb,
      postcode: this.state.postcode,
      photo: this.state.photo,
    }, schema);
  },

  onImageSelected(payload) {
    this.setState({ photo: payload.dataURL });
  },

  onImageSizeError(error) {
    var file = error.file;
    var sizeLimit = error.sizeLimit / 1000; // in KB (base10)
    var errorMessage = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: errorMessage });
  },

  render() {
    var { street, suburb, postcode, ownerEmail, tenantEmail, fileSizeError, photo, authFailure, validationError } = this.state;
    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;

    var standardActions = [
      { text: 'Cancel' },
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
        <RaisedButton label="Edit Details"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Edit Details"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          {validationErrorMessage}
          {authFailMessage}
          <TextField
            value={street}
            multiLine={true}
            name="Street Address"
            onChange={this.onChange.bind(this, 'street')}
            floatingLabelText="Street Address" />
          <TextField
            value={suburb}
            multiLine={true}
            name="Suburb"
            onChange={this.onChange.bind(this, 'suburb')}
            floatingLabelText="Suburb" />
          <TextField
            value={postcode}
            multiLine={true}
            name="Postcode"
            onChange={this.onChange.bind(this, 'postcode')}
            floatingLabelText="Postcode" />
          <TextField
            value={ownerEmail}
            multiLine={true}
            name="Owner Email"
            onChange={this.onChange.bind(this, 'ownerEmail')}
            floatingLabelText="Owner Email" />
          <TextField
            value={tenantEmail}
            multiLine={true}
            name="Tenant Email"
            onChange={this.onChange.bind(this, 'tenantEmail')}
            floatingLabelText="Tenant Email (Leaving blank will remove current tenant)"
            fullWidth />
          <div>
            <Label>Image (Not Required)</Label>
            <img width={300} src={photo} />
            {sizeError}
            <ImageSelector maxSize={200000}
                           onImageSelected={this.onImageSelected}
                           onImageSizeError={this.onImageSizeError} />
          </div>
        </Dialog>
      </div>
    );
  }
});

// Validation schema for update property form data.
var schema = Joi.object().keys({
  tenantEmail: Joi.string().email().max(255).allow(['', null]),
  ownerEmail: Joi.string().email().max(255),
  street: Joi.string().min(1).max(500),
  suburb: Joi.string().min(1).max(500),
  postcode: Joi.string().min(4).max(4),
  photo: Joi.string(),
});

module.exports = MuiContextified(Radium(UpdatePropertyForm));
