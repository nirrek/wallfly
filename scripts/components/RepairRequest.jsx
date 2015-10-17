var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var RepairRequestForm = require('./RepairRequestForm.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var Priority = require('./Priority.jsx');

var RepairRequest = React.createClass({
  getInitialState() {
    return {
      repairRequests: [], // list of repair requests
      responseReceived: false, // received API response?
    };
  },

  getRepairRequests() {
    Api.getRepairRequests({
      callback: (err, response) => {
        if (err) {
          return console.log(err);
        }

        console.log(response.data);

        this.setState({
          responseReceived: true,
          repairRequests: response.data
        });
      }
    });
  },
  componentWillMount() {
    this.getRepairRequests();
  },

  render() {
    // Don't render until we have data cached from the server.
    if (!this.state.responseReceived) return null;

    var { repairRequests } = this.state;

    var rows = repairRequests.map(request => {
      return (
        <tr key={request.id}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td><Priority type={request.priority} /></td>
          <td>{request.request}</td>
          <td>
            {request.photo ?
              ( <img style={style.img} src={request.photo} /> ) :
              ( <i>No image added</i> )}
          </td>
          <td>{request.status}</td>
        </tr>
      );
    });

    // No repair requests
    if (rows.length === 0) {
      rows = (
        <tr>
          <td style={style.center} colSpan="4">No repair requests yet</td>
        </tr>
      );
    }

    return (
      <div style={style.page}>
        <PageHeading>Repair Requests</PageHeading>
        <table>
          <colgroup style={{width: 140}}></colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Priority</th>
              <th>Description</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
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
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
  center: {
    textAlign: 'center',
  }
};

module.exports = MuiContextified(Radium(RepairRequest));
