var React = require('react');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var ImageSelector = require('./ImageSelector.jsx');
var Label = require('./Label.jsx');
var ErrorMessage = require('./ErrorMessage.jsx');
var Radium = require('radium');

var RepairRequestAddImage = React.createClass({
  propTypes: {
    repairRequestImageAdded: React.PropTypes.func,
    requestId: React.PropTypes.number,
  },

  getInitialState() {
    return {
      image: '', //base64 encoding of repair request image
      fileSizeError: '', // file size error message
    }
  },

  onButtonClick() {
    this.refs.dialog.show();
  },

  /**
   * Form submission event handler. Sends a request to the server to add the
   * repair request, and updates the repair requests if successful.
   */
  onSubmit(event) {

    // API call to add new Image
    Api.addRepairRequestImage({
      data: {
        image: this.state.image,
        requestId: this.props.requestId,
      },
      callback: (err, response) => {
        if (err) {
          return;
        }

        // Clear the form
        this.setState({
          image: '',
        });

        this.props.repairRequestImageAdded();
        this.refs.dialog.dismiss();
      }
    });
  },

  onImageSelected(payload) {
    this.setState({ image: payload.dataURL });
  },

  onImageSizeError(error) {
    var file = error.file;
    var sizeLimit = error.sizeLimit / 1000; // in KB (base10)
    var error = `${file.name} exceeds size limit of ${sizeLimit}kb.`;
    this.setState({ fileSizeError: error });
  },

  render() {
    var { fileSizeError } = this.state;
    var sizeError = fileSizeError ? (
      <ErrorMessage fillBackground={true}>Error: {fileSizeError}</ErrorMessage>
    ) : null;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Add a New Image', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    return (
      <div style={style.formContainer}>
        <RaisedButton label="Add a New Image"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Add a New Image"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          <div style={style.selectorContainer}>
            <Label>Image</Label>
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

var style = {
  formContainer: {
    width: '325px',
  },
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  selectorContainer: {
    width: '100%'
  },
  img: {
    maxWidth: 200,
  },
  heading: {
    margin: 0
  }
};

module.exports = MuiContextified(Radium(RepairRequestAddImage));
