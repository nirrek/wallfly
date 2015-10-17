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

var OwnerRepairRequests = React.createClass({
  getInitialState() {
    return {
      requests: [],
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
          requests: response.data
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

  render() {
    // Don't render until we have data cached from the server.
    if (!this.state.responseReceived) return null;

    var rows = this.state.requests.map(request => {
      return (
        <tr key={request.id}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td><Priority type={request.priority} /></td>
          <td>{request.request}</td>
          <td><img style={styles.img} src={request.photo} /></td>
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
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
};

module.exports = MuiContextified(Radium(OwnerRepairRequests));
