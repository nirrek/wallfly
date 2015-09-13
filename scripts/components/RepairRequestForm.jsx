var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;

var RepairRequestForm = React.createClass({
<<<<<<< HEAD
  getInitialState() {
    return {
      description: '', // User entered description
      image: '', // user entered image
    }
  },

  propTypes: {
    repairRequestAdded: React.PropTypes.func,
  },

  // Capture the input field state after each keypress.
=======
  propTypes: {
    repairRequestAdded: React.PropTypes.func,
  },

  getInitialState() {
    return {
      description: '', // User entered description
      dataUri: '', // base64 encoding of the user selected image.
    }
  },

  /**
   * Event handler for capturing in the input field state on each keypress.
   * @param  {String} field The identifier for the input field.
   */
>>>>>>> master
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

<<<<<<< HEAD
  // Handle the form submission event when the user adds new repair request.
=======
  /**
   * Form submission event handler. Sends a request to the server to add the
   * repair request, and updates the repair requests if successful.
   */
>>>>>>> master
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // API call to add repair request
    Api.addRepairRequest({
      data: {
        description: this.state.description,
<<<<<<< HEAD
        image: this.state.image
=======
        dataUri: this.state.dataUri,
>>>>>>> master
      },
      callback: (err, response) => {
        if (err) {
          return;
        }
<<<<<<< HEAD
        // Clear the form
        this.setState({
          description: "",
          image: ""
        });
        // Refetch repair requests via props
=======

        // Clear the form
        this.setState({
          description: '',
          dataUri: '',
        });

>>>>>>> master
        this.props.repairRequestAdded();
      }
    });
  },

<<<<<<< HEAD
  render() {
    var { description, image } = this.state;
=======
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
>>>>>>> master
    var errorMessage;
    return (
      <div style={style.formContainer}>
        <Paper zDepth={1}>
          <form style={style.form} onSubmit={this.onSubmit}>
            <h3 style={style.heading}>Lodge a New Repair Request</h3>
            <div style={style.error}> { errorMessage } </div>
            <TextField
              value={description}
              multiLine={true}
              name="Description"
              onChange={this.onChange.bind(this, 'description')}
              floatingLabelText="Description" />
<<<<<<< HEAD
            <TextField
              value={image}
              name="Image"
              onChange={this.onChange.bind(this, 'image')}
              floatingLabelText="Image" />
=======
            <div style={style.inputContainer}>
              {dataUri ?
                (<img style={style.img} src={this.state.dataUri} />) :
                (null)}
              <input type="file" name="file" onChange={this.onFileSelected} />
            </div>
>>>>>>> master
            <RaisedButton
              type="submit"
              label="Lodge Repair Request"
              primary={true}
              backgroundColor="#2ECC71"
              style={style.button} />
          </form>
        </Paper>
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
<<<<<<< HEAD
=======
  inputContainer: {
    margin: '40px 0'
  },
  img: {
    maxWidth: 200,
  },
>>>>>>> master
  heading: {
    margin: 0
  }
};

module.exports = MuiContextified(RepairRequestForm);
