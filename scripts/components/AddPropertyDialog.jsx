var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var ImageSelector = require('./ImageSelector.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Joi = require('joi');
var JoiError = require('./JoiError.jsx');
var Radium = require('radium');
var Label = require('./Label.jsx');
var DialogEnhanced = require('./DialogEnhanced.jsx');

var AddPropertyDialog = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onAddProperty: React.PropTypes.func.isRequired,
  },

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
    };
  },

  /**
   * Event handler for capturing in the input field state on each keypress.
   * @param  {String} field The identifier for the input field.
   */
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Adds a new property with the current state of the form
  onAddProperty() {
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
        this.resetState();
        React.findDOMNode(this.refs.form).reset();

        this.props.onAddProperty();
      }
    });
  },

  // Resets the state of the form
  resetState() {
    this.setState({
      streetAddress: '', // User entered street address
      suburb: '', // User entered suburb
      postCode: '', // User entered post code
      ownerEmail: '', // User entered owner email
      tenantEmail: '', // User entered tenant email
      dataUrl: '', // base64 encoding of the user selected image.
      fileSizeError: '', // file size error message
      authFailure: '', // server auth failure message
      validationError: false, // clientside validation failure
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
    var errorMessage = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: errorMessage });
  },

  onClose() {
    this.resetState();
    this.props.onClose();
  },

  render() {
    var { streetAddress, suburb, postCode, ownerEmail, tenantEmail, dataUrl, fileSizeError, authFailure, validationError } = this.state;

    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;

    var authFailMessage = authFailure ? (
      <ErrorMessage fillBackground={true}>{authFailure}</ErrorMessage>
    ) : null;

    // Form validation error
    var validationError = (validationError) ? (
      <JoiError error={validationError} fillBackground={true} />
    ) : null;

    var actions = [
      { text: 'Cancel', onTouchTap: this.onClose },
      { text: 'Add New Property', onTouchTap: this.onAddProperty }
    ];

    return (
      <DialogEnhanced isOpen={this.props.isOpen}
                      autoScrollBodyContent={true}
                      autoDetectWindowHeight={true}
                      contentStyle={{width: 375}}
                      bodyStyle={{}}
                      actions={actions}>
        <form ref="form" style={style.form}>
          { validationError }
          { authFailMessage }
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
          <Label>Property Photo</Label>
          <div style={style.selectorContainer}>
            {sizeError}
            <ImageSelector maxSize={200000}
                           image={dataUrl}
                           onImageSelected={this.onImageSelected}
                           onImageSizeError={this.onImageSizeError} />
          </div>
        </form>
      </DialogEnhanced>
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
    width: '20em',
  },
  selectorContainer: {
    marginBottom: '2em'
  }
};

module.exports = MuiContextified(Radium(AddPropertyDialog));
