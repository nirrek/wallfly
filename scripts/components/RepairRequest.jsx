var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;

var RepairRequestAdd = React.createClass({
  getInitialState() {
    return {
      subject: '', // user entered subject
      description: '', // user entered description
      image: '' // user entered image
    }
  },
  // Capture the input field state after each keypress.
  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  },
  // Handle the form submission event when the user tries to log in.
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    Api.addRepairRequest({
      data: {
        date: this.state.date,
        subject: this.state.subject,
        description: this.state.description,
        image: this.state.image
      },
      callback: (err, response) => {
        if (err) {
          return;
        }

      // TODO: After submit, clear form and refresh module
        
      }
    });
  },
  render() {
    var { subject, description, image } = this.state;
    var errorMessage;
    var currentDate = new Date();
    return (
      <div style={style.formContainer}>
        <h2 style={style.heading}>Add a Repair Request</h2>
        <Paper zDepth={1}>  
          <form style={style.form} onSubmit={this.onSubmit}>
            <div style={style.error}> { errorMessage } </div>
            <DatePicker
              name="Date"
              //TODO: set default date, changing date with selected date
              onChange={this._handleChange} 
              floatingLabelText="Date"/>
            <TextField
              value={subject}
              name="Subject"
              onChange={this.onChange.bind(this, 'subject')}
              floatingLabelText="Subject" />
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
            <RaisedButton type="submit" label="Submit" primary={true} backgroundColor="#2ECC71" style={style.button} />
          </form>
        </Paper>
      </div>
    );
  }
});

var RepairRequest = React.createClass({
  getInitialState() {
    return {
      repairRequests: [], // list of repair requests
    };
  },

  componentWillMount() {
    Api.getRepairRequests({
      callback: (err, response) => {
        if (err) {
          // TODO
          return console.log(err);
        }

        this.setState({
          repairRequests: response.data
        });
      }
    });
  },

  render() {
    var { repairRequests } = this.state;

    var rows = repairRequests.map(request => {
      return (
        <tr key={request.date}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td>{request.subject}</td>
          <td>{request.request}</td>
          <td><img src={request.photo} /></td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <table>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
          {rows}
        </table>
        <RepairRequestAdd />
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

module.exports = MuiContextified(RepairRequest);
