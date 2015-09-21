var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var Dialog = mui.Dialog;

var RepairRequestForm = React.createClass({
  propTypes: {
    repairRequestAdded: React.PropTypes.func,
  },

  getInitialState() {
    return {
      description: '', // User entered description
      dataUri: '', // base64 encoding of the user selected image.
    }
  },

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
    Api.addRepairRequest({
      data: {
        description: this.state.description,
        dataUri: this.state.dataUri,
      },
      callback: (err, response) => {
        if (err) {
          return;
        }

        // Clear the form
        this.setState({
          description: '',
          dataUri: '',
        });

        this.props.repairRequestAdded();
        this.refs.dialog.dismiss();
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

    reader.onload = upload => this.setState({ dataUri: upload.target.result });
    reader.readAsDataURL(file);
  },

  render() {
    var { description, dataUri } = this.state;
    var errorMessage;
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this.onSubmit, ref: 'submit' }
    ];
    return (
      <div style={style.formContainer}>
        <RaisedButton label="Lodge a New Repair Request"
                      primary={true}
                      onClick={this.onButtonClick} />
        <Dialog
          title="Lodge a New Repair Request"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          ref="dialog">
          <div style={style.error}> { errorMessage } </div>
          <TextField
            value={description}
            multiLine={true}
            name="Description"
            onChange={this.onChange.bind(this, 'description')}
            floatingLabelText="Description" />
          <div style={style.inputContainer}>
            {dataUri ?
              (<img style={style.img} src={this.state.dataUri} />) :
              (null)}
            <input type="file" name="file" onChange={this.onFileSelected} />
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

module.exports = MuiContextified(RepairRequestForm);
