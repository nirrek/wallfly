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

var NewPropertyForm = React.createClass({
  getInitialState() {
    return {
      streetAddress: '', // User entered street address
      suburb: '', // User entered suburb
      postCode: '', // User entered post code
      ownerEmail: '', // User entered owner email
      tenantEmail: '', // User entered tenant email
      dataUrl: '', // base64 encoding of the user selected image.
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
        });

        this.refs.snackbar.show();
      }
    });
  },

  /**
   * Callback for a user selecting a file for upload. Reads the file as a base64
   * encoded data URI and stores this in component state.
   */
  onFileSelected(event) {
    var reader = new FileReader(); // File API
    var file = event.target.files[0];

    reader.onload = upload => this.setState({ dataUrl: upload.target.result });
    reader.readAsDataURL(file);
  },


  render() {
    var { streetAddress, suburb, postCode, ownerEmail, tenantEmail, dataUrl } = this.state;
    return (
      <div>
        <Snackbar
          ref="snackbar"
          message="New property successfully added"
          autoHideDuration={3000} />
        <form style={style.form} onSubmit={this.onSubmit}>
          <h2>Add New Property</h2>
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
          <div style={style.photoSelectorContainer}>
            {dataUrl ?
              (<img style={style.img} src={dataUrl} />) :
              (null)}
            <input type="file" onChange={this.onFileSelected} />
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
  photoSelectorContainer: {
    marginBottom: '2em'
  }
};

module.exports = MuiContextified(NewPropertyForm);
