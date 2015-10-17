var React = require('react');
var MuiContextified = require('./MuiContextified.jsx');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var SelectField = MaterialUi.SelectField;
var Snackbar = MaterialUi.Snackbar;
var moment = require('moment');
var Navigation = require('react-router').Navigation;
var User = require('../utils/User.js');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var Priority = require('./Priority.jsx');
var Label = require('./Label.jsx');


/**
 * RepairRequestAggregator is the route endpoint for the agent, providing an
 * aggregate view of all repair requests across the agent's properties.
 */
var PropertyList = React.createClass({
  mixins: [ Navigation ],

  getInitialState() {
    return {
      repairRequests: [],
      responseReceived: false, // received API response?
      priorityFilter: 'All Priorities',
    };
  },

  componentWillMount() {
    this.getRepairRequests();
  },

  // Fetches the repair requests from the server
  getRepairRequests() {
    Api.getAllRepairRequests({
      params: {
        agentId: User.getUser().id,
      },
      callback: (err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(res.data);

        this.setState({
          responseReceived: true,
          repairRequests: res.data,
        });
      }
    });
  },

  // Update select menu on change.
  onSelectChange(event, selectedPriorityIndex) {
    var priority = priorities[selectedPriorityIndex].name;
    this.setState({ priorityFilter: priority });
  },

  onStatusChange(id, event, selectedStatusIndex) {
    var modifiedRequest = this.state.repairRequests.find(el => el.id === id);
    modifiedRequest.status = statuses[selectedStatusIndex].text;
    delete modifiedRequest.street;
    delete modifiedRequest.suburb;

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
    var { repairRequests, priorityFilter } = this.state;

    var filteredRequests = repairRequests.filter((request) => {
      if (priorityFilter === 'All Priorities') return true;
      return (request.priority === priorityFilter);
    });

    var rows = filteredRequests.map((request) => {
      return (
        <tr key={request.id}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td><Priority type={request.priority} /></td>
          <td style={{ whiteSpace: 'nowrap' }}>{request.street}<br />{request.suburb}</td>
          <td>{request.request}</td>
          <td>
            {request.photo ?
              ( <img style={styles.img} src={request.photo} /> ) :
              ( <i>No image added</i> )}
          </td>
          <td>
            <SelectField
              style={{ width: 140 }}
              value={request.status}
              valueMember="name"
              onChange={this.onStatusChange.bind(this, request.id)}
              menuItems={statuses} />
          </td>
        </tr>
      );
    });

    // No matches for the filter. Notify user.
    if (rows.length === 0) {
      rows = (
        <tr>
          <td style={styles.noEntries} colSpan="5">
            No entries
          </td>
        </tr>
      );
    }

    return (
      <div>
        <PageHeading>Repair Requests (All Properties)</PageHeading>
        <div style={styles.filterContainer}>
          <Label inline={true}>Filter by priority:</Label>
          <SelectField
            value={priorityFilter}
            valueMember="name"
            onChange={this.onSelectChange}
            menuItems={priorities} />
        </div>
        <table style={styles.table}>
          <colgroup style={{width: 140}}></colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Priority</th>
              <th>Property</th>
              <th>Description</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
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

// Priorities
var priorities = [
  { name: 'Urgent', text: 'Urgent' },
  { name: 'Can Wait', text: 'Can Wait' },
  { name: 'Information', text: 'Information' },
  { name: 'All Priorities', text: 'All Priorities' },
];

// Statuses
var statuses = [
  { name: 'Submitted', text: 'Submitted' },
  { name: 'Pending', text: 'Pending' },
  { name: 'Approved', text: 'Approved' },
  { name: 'Declined', text: 'Declined' },
];

var styles = {
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  table: {
    width: '100%',
  },
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
  noEntries: {
    textAlign: 'center',
  }
};

module.exports = MuiContextified(Radium(PropertyList));
