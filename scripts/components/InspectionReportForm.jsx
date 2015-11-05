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
var Radium = require('radium');

/**
 * InspectionReportForm Component
 * Component for adding a new inspection report.
 */
var InspectionReportForm = React.createClass({
  propTypes: {
    inspectionReportAdded: React.PropTypes.func,
    propertyID: React.PropTypes.number
  },

  getInitialState() {
    return {
      comments: '', // User entered description
      image: '', // base64 encoding of the user selected image.
      fileSizeError: '', // file size error message
    }
  },

  /**
   * Show the modal on button click.
   */
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
    var propertyId = this.props.propertyID;
    Api.addPropertyInspectionReports({
      data: {
        comments: this.state.comments,
        image: this.state.image,
        propertyId: this.props.propertyID,
      },
      callback: (err, response) => {
        if (err) {
          return;
        }

        // Clear the form
        this.setState({
          comments: '',
          image: '',
        });

        this.props.inspectionReportAdded();
        this.refs.dialog.dismiss();
      }
    });
  },

  /**
   * Event handler for the user selecting an image on the filesystem.
   * @param  {Object} payload The File api event object.
   */
  onImageSelected(payload) {
    this.setState({ image: payload.dataURL });
  },

  /**
   * Event handler for a file size error for the ImageSelector.
   * @param  {Object} error The error object.
   */
  onImageSizeError(error) {
    var file = error.file;
    var sizeLimit = error.sizeLimit / 1000; // in KB (base10)
    var error = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: error });
  },

  render() {
    var { comments, fileSizeError } = this.state;
    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;
    var errorMessage;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Lodge Inspection', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    return (
      <div style={style.formContainer}>
        <RaisedButton label="Lodge an Inspection"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Lodge an Inspection"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          <div style={style.error}> { errorMessage } </div>
          <TextField
            value={comments}
            multiLine={true}
            name="Comments"
            onChange={this.onChange.bind(this, 'comments')}
            floatingLabelText="Comments"
            hintText="Describe the condition and details of the inspection"
            fullWidth />
          <div style={style.selectorContainer}>
            <Label>Image</Label>
            {sizeError}
            <ImageSelector onImageSelected={this.onImageSelected}
                           onImageSizeError={this.onImageSizeError} />
          </div>
        </Dialog>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  formContainer: {
    width: '325px',
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

module.exports = Radium(MuiContextified(InspectionReportForm));
