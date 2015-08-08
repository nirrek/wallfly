var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');

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
            <th>Request</th>
            <th>Image</th>
          </tr>
          {rows}
        </table>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default RepairRequest;
