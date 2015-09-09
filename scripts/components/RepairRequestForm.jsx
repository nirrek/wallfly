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
  getInitialState() {
    return {
      description: '', // User entered description
      image: '', // user entered image
    }
  },

  propTypes: {
        newDataAdded:   React.PropTypes.func,
  },

  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },

  // Handle the form submission event when the user adds new repair request.
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // API call to add repair request
    Api.addRepairRequest({
      data: {
        description: this.state.description,
        image: this.state.image
      },
      callback: (err, response) => {
        if (err) {
          return;
        }
        // Clear the form
        this.setState({
          description: "",
          image: ""
        });
        // Refetch repair requests via props
        this.props.newDataAdded();
      }
    });
  },

  render() {
    var { description, image } = this.state;
    var errorMessage;
    return (
      <div style={style.formContainer}>
        <h2 style={style.heading}>Add a Repair Request</h2>
        <Paper zDepth={1}>
          <form style={style.form} onSubmit={this.onSubmit}>
            <div style={style.error}> { errorMessage } </div>
            <TextField
              value={description}
              name="Description"
              onChange={this.onChange.bind(this, 'description')}
              floatingLabelText="Description" />
            <TextField
              value={image}
              name="Image"
              onChange={this.onChange.bind(this, 'image')}
              floatingLabelText="Image" />
            <RaisedButton
              type="submit"
              label="Submit"
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
};

module.exports = MuiContextified(RepairRequestForm);
