var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var Priority = require('./Priority.jsx');
var User = require('../utils/User.js');
var MuiContextified = require('./MuiContextified.jsx');
var MaterialUi = require('material-ui');
var SelectField = MaterialUi.SelectField;
var Snackbar = MaterialUi.Snackbar;
var RepairRequestImages = require('./RepairRequestImages.jsx');


var OwnerRepairRequests = React.createClass({
  getInitialState() {
    return {
      repairRequests: [],
      responseReceived: false, // received API response?
    };
  },

  getPropertyRepairRequests(){
    var { propertyId } = this.props.params;
    Api.getPropertyRepairRequests({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState({
          responseReceived: true,
          repairRequests: response.data
        });
      }
    });
  },

  componentWillMount() {
    this.getPropertyRepairRequests();
  },

  onStatusChange(id, event, selectedStatusIndex) {
    var modifiedRequest = this.state.requests.find(el => el.id === id);
    modifiedRequest.status = statuses[selectedStatusIndex].text;

    Api.putRepairRequest({
      data: {
        ...modifiedRequest
      },
      callback: (err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        this.refs.snackbar.show();
      }
    });

    this.forceUpdate();
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
    var rows = groupedRequests.map(request => {
      return (
        <tr key={request.id}>
          <td>{moment(request.repairRequests[0].date).format('Do MMM YYYY')}</td>
          <td><Priority type={request.repairRequests[0].priority} /></td>
          <td>{request.repairRequests[0].request}</td>
          <td>
            <RepairRequestImages images={request.repairRequests} refresh={this.getPropertyRepairRequests}/>
          </td>
          <td>
            { User.getUser().type === 'agent' ? (
              <SelectField
                value={request.status}
                valueMember="name"
                onChange={this.onStatusChange.bind(this, request.id)}
                menuItems={statuses} />
            ) : (
              request.status
            )}
          </td>
        </tr>
      );
    });

    return (
      <div style={styles.container}>
        <PageHeading>Repair Requests</PageHeading>
        <table>
          <thead>
            <colgroup style={{width: 140}}></colgroup>
            <th>Date</th>
            <th>Priority</th>
            <th>Request</th>
            <th>Photo</th>
            <th>Status</th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <Snackbar
          ref="snackbar"
          message="Repair Request Updated"
          autoHideDuration={3000} />
      </div>
    );
  }
});

// Statuses
var statuses = [
  { name: 'Submitted', text: 'Submitted' },
  { name: 'Pending', text: 'Pending' },
  { name: 'Approved', text: 'Approved' },
  { name: 'Declined', text: 'Declined' },
];

var styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
  },
};

module.exports = MuiContextified(Radium(OwnerRepairRequests));
