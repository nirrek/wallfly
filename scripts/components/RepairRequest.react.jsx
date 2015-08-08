var React = require('react');
var axios = require('axios');
var fecha = require('fecha');
var config = require('../utils/config.js');

// simulate a user Store
var user = {
  id: 5,
}

var RepairRequest = React.createClass({
  getInitialState() {
    return {
      repairRequests: [], // list of repair requests
    };
  },

  componentWillMount() {
    axios.get(`${config.server}/users/${user.id}/repairs`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        this.setState({
          repairRequests: response.data
        });
        console.log(response.data);
      })
      .catch((response) => {
        // TODO - read up on error handling
        console.log(response);
      });
  },

  render() {
    var { repairRequests } = this.state;

    var rows = repairRequests.map(request => {
      return (
        <tr>
          <td>{fecha.format(new Date(request.date), 'Do MMM YYYY')}</td>
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
