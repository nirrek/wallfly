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
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');

var UpdatePropertyForm = React.createClass({
  propTypes: {
    propertyDetailsUpdated: React.PropTypes.func,
    propertyID: React.PropTypes.string,
  },

  getInitialState() {
    return {
      street: '', // Property street address
      suburb: '', // Property suburb
      postcode: '', // Property post code
      ownerEmail: '', // User entered owner email
      tenantEmail: '', // User entered tenant email
      photo: '', // base64 encoding of the user selected image.
      fileSizeError: '', // file size error message
      authFailure: '', // server auth failure message
      validationError: false, // clientside validation failure
    }
  },

  // Fetches the details for the property
  getPropertyDetails() {
    var propertyId = parseInt(this.props.propertyID);

    Api.getPropertyDetails({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState(response.data);
      }
    });
  },

  onButtonClick() {
    // Clear prior error states.
    this.setState({
      validationError: false,
      authFailure: '',
      fileSizeError: ''
    });

    // Request values to fill the form
    this.getPropertyDetails();

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

    // API call to update property details
    var propertyId = parseInt(this.props.propertyID);

    Api.updatePropertyDetails({
      data: {
        propertyId: propertyId,
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

        // Request new values for the form
        this.getPropertyDetails();

        this.props.propertyDetailsUpdated();
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
    var error = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: error });
  },

  render() {
    var { street, suburb, postcode, ownerEmail, tenantEmail, fileSizeError, photo, authFailure, validationError } = this.state;
    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;
    var errorMessage;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Update Details', onTouchTap: this.onSubmit, ref: 'submit' }
    ];

    var authFailMessage = authFailure ? (
      <ErrorMessage fillBackground={true}>{authFailure}</ErrorMessage>
    ) : null;

    // Form validation error
    var validationError = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    return (
      <div>
        <RaisedButton label="Update Details"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Update Details"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          <div style={style.error}> { errorMessage } </div>
          <div style={style.error}> {validationError} </div>
          <div style={style.error}> {authFailMessage} </div>
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
          <div style={style.selectorContainer}>
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
  tenantEmail: Joi.string().email().max(255).allow(''),
  ownerEmail: Joi.string().email().max(255),
  street: Joi.string().min(1).max(500),
  suburb: Joi.string().min(1).max(500),
  postcode: Joi.string().min(4).max(4),
  photo: Joi.string(),
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
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

module.exports = MuiContextified(UpdatePropertyForm);
