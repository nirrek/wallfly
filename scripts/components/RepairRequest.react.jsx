import React from 'react';
var axios = require('axios');
var fecha = require('fecha');

// simulate a user Store
var user = {
  id: 5,
}

class RepairRequest extends React.Component {
  state = {
    repairRequests: [], // list of repair requests
  }

  componentWillMount() {
    axios.get(`http://localhost:8000/users/${user.id}/repairs`, {
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
  }

  render() {
    let { repairRequests } = this.state;

    let rows = repairRequests.map(request => {
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
}

let style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default RepairRequest;
