var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var OwnerRepairRequestStatus = require('./OwnerRepairRequestStatus.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var OwnerRepairRequestImages = require('./OwnerRepairRequestImages.jsx');

var OwnerRepairRequests = React.createClass({
  getInitialState() {
    return {
      requests: []
    };
  },

  getPropertyRepairRequests(){
    var { propertyId } = this.props.params;
    Api.getPropertyRepairRequests({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState({ requests: response.data });
      }
    });
  },

  componentWillMount() {
    this.getPropertyRepairRequests();
  },

  render() {
    var rows = this.state.requests.map(request => {
      return (
        <tr key={request.id}>
          <td>{moment(request.date).format('Do MMM YYYY')}</td>
          <td>{request.request}</td>
          <td>
            <OwnerRepairRequestImages requestId={request.id}/>
          </td>
          <td>{request.status}</td>
          <td>
            <OwnerRepairRequestStatus
                requestId={request.id}
                propertyId={this.props.params.propertyId}
                statusChanged={this.getPropertyRepairRequests}
                status={request.status} />
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
            <th>Request</th>
            <th>Photo</th>
            <th>Status</th>
            <th></th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});

var styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
  },
};

module.exports = Radium(OwnerRepairRequests);
