var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var Snackbar = mui.Snackbar;
var ImageSelector = require('./ImageSelector.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Radium = require('radium');

var NewPropertyForm = React.createClass({
  getInitialState() {
    return {
      streetAddress: '', // User entered street address
      suburb: '', // User entered suburb
      postCode: '', // User entered post code
      ownerEmail: '', // User entered owner email
      tenantEmail: '', // User entered tenant email
      dataUrl: '', // base64 encoding of the user selected image.
      fileSizeError: '', // file size error message
      authFailure: '', // server auth failure message
      validationError: false, // clientside validation failure
    }
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
    event.preventDefault();
    event.stopPropagation();

    // Clear prior error states.
    this.setState({
      fileSizeError: '',
      authFailure: '',
      validationError: false,
    });

    var validation = this.validate();
    if (validation.error) {
      this.setState({ validationError: validation.error });
      return;
    }

    // API call to add new property
    Api.addNewProperty({
      data: {
        streetAddress: this.state.streetAddress,
        suburb: this.state.suburb,
        postCode: this.state.postCode,
        ownerEmail: this.state.ownerEmail,
        tenantEmail: this.state.tenantEmail,
        dataUrl: this.state.dataUrl,
      },
      callback: (err, response) => {
        if (err) {
          var msg = (response.status === 0)
            ? 'Connection timed-out. Please try again.'
            : response.data;
          this.setState({ authFailure: msg });
          return;
        }

        // Clear the form
        this.setState({
          streetAddress: '',
          suburb: '',
          postCode: '',
          ownerEmail: '',
          tenantEmail: '',
          dataUrl: '',
          fileSizeError: '',
          authFailure: '',
          validationError: false,
        });

        this.refs.snackbar.show();
      }
    });
  },

  // Validate the form, returns the Joi result of the validation.
  validate() {
    return Joi.validate({
      streetAddress: this.state.streetAddress,
      suburb: this.state.suburb,
      postCode: this.state.postCode,
      ownerEmail: this.state.ownerEmail,
      tenantEmail: this.state.tenantEmail,
      dataUrl: this.state.dataUrl,
    }, schema);
  },

  onImageSelected(payload) {
    this.setState({ dataUrl: payload.dataURL });
  },

  onImageSizeError(error) {
    var file = error.file;
    var sizeLimit = error.sizeLimit / 1000; // in KB (base10)
    var error = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: error });
  },

  render() {
    var { streetAddress, suburb, postCode, ownerEmail, tenantEmail, dataUrl, fileSizeError, authFailure, validationError } = this.state;

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
        <Snackbar
          ref="snackbar"
          message="New property successfully added"
          autoHideDuration={3000} />
        <form style={style.form} onSubmit={this.onSubmit}>
          <h2>Add New Property</h2>
          <div style={style.error}> { errorMessage } </div>
          <div style={style.error}> {validationError} </div>
          <div style={style.error}> {authFailMessage} </div>
          <TextField
            value={streetAddress}
            multiLine={true}
            onChange={this.onChange.bind(this, 'streetAddress')}
            floatingLabelText="Street Address" />
          <TextField
            value={suburb}
            multiLine={true}
            onChange={this.onChange.bind(this, 'suburb')}
            floatingLabelText="Suburb" />
          <TextField
            value={postCode}
            multiLine={true}
            onChange={this.onChange.bind(this, 'postCode')}
            floatingLabelText="Post Code" />
          <TextField
            value={ownerEmail}
            multiLine={true}
            onChange={this.onChange.bind(this, 'ownerEmail')}
            floatingLabelText="Owner Email" />
          <TextField
            value={tenantEmail}
            multiLine={true}
            onChange={this.onChange.bind(this, 'tenantEmail')}
            floatingLabelText="Tenant Email (optional)" />
          <div style={style.label}>Property Photo</div>
          <div style={style.selectorContainer}>
            {sizeError}
            <ImageSelector maxSize={200000}
                           onImageSelected={this.onImageSelected}
                           onImageSizeError={this.onImageSizeError} />
          </div>
          <RaisedButton
            type="submit"
            label="Add New Property"
            primary={true}
            style={style.button} />
        </form>
      </div>
    );
  }
});

var schema = Joi.object().keys({
  streetAddress: Joi.string().min(1).max(500),
  suburb: Joi.string().min(1).max(500),
  postCode: Joi.string().min(4).max(4),
  ownerEmail: Joi.string().email().max(255),
  tenantEmail: Joi.string().email().max(255).allow(['', null]),
  dataUrl: Joi.string(),
});

var style = {
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  img: {
    maxWidth: 200,
  },
  label: {
    marginTop: '1em',
    fontSize: 15,
  },
  SelectorContainer: {
    marginBottom: '2em'
  }
};

module.exports = Radium(MuiContextified(NewPropertyForm));
