var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var RepairRequestForm = require('./RepairRequestForm.jsx');
var Radium = require('radium');
var RepairRequestImages = require('./RepairRequestImages.jsx');
var PageHeading = require('./PageHeading.jsx');
var Priority = require('./Priority.jsx');
var RepairRequestAddImage = require('./RepairRequestAddImage.jsx');

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

  groupById(data) {
    var obj = data.reduce(function(acc, d) {
      var p = d.id;
      if (!acc[0].hasOwnProperty(p)) acc[0][p] = [];
      acc[0][p].push(d);
      return acc;
    },[{}])
    .reduce(function(acc, v){
      Object.keys(v).forEach(function(k){acc.push({id:k, repairRequests:v[k]})});
      return acc;
    },[]);
    return obj;
  },


  render() {
    // Don't render until we have data cached from the server.
    if (!this.state.responseReceived) return null;

    var { repairRequests } = this.state;
    var groupedRequests = this.groupById(repairRequests);
    var rows = groupedRequests.map((request) => {
      return (
        <tr key={request.id}>
          <td>{moment(request.repairRequests[0].date).format('Do MMM YYYY')}</td>
          <td><Priority type={request.repairRequests[0].priority} /></td>
          <td>{request.repairRequests[0].request}</td>
          <td>
            <RepairRequestImages 
            images={request.repairRequests} 
            refresh={this.getRepairRequests}
            />
            <RepairRequestAddImage 
            repairRequestImageAdded= {this.getRepairRequests}
            requestId={request.repairRequests[0].id} 
            />
          </td>
          <td>{request.repairRequests[0].status}</td>
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
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
  center: {
    textAlign: 'center',
  }
};

module.exports = MuiContextified(Radium(RepairRequest));
