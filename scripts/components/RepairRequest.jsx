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
var Radium = require('radium');
var RepairRequestImages = require('./RepairRequestImages.jsx');

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
        <tr key={request.id}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td>{request.request}</td>
          <td>
          <RepairRequestImages requestId={request.id}/>
          </td>
          <td>{request.status}</td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <table>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
          {rows}
        </table>
        <div style={style.formContainer}>
          <RepairRequestForm repairRequestAdded={this.getRepairRequests} />
          
        </div>
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
    marginTop: '1em'
  },
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  image: {
    maxHeight: '7em',
  },
};

module.exports = Radium(MuiContextified(RepairRequest));
