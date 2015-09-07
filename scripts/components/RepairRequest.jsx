var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var RepairRequestForm = require('./RepairRequestForm.jsx');

var RepairRequest = React.createClass({
  getInitialState() {
    return {
      repairRequests: [], // list of repair requests
    };
  },

  getRepairRequests() {
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

  componentWillMount() {
    this.getRepairRequests()
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
        <RepairRequestForm newDataAdded={this.getRepairRequests}/>
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
