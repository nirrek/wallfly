import React from 'react';
var axios = require('axios');
var fecha = require('fecha');

// simulate a user Store
var user = {
  id: 5,
}

class InspectionReport extends React.Component {
  state = {
    inspections: [], // list of repair requests
  }

  componentWillMount() {
    axios.get(`http://localhost:8000/users/${user.id}/inspections`, {
        withCredentials: true, // send cookies for cross-site requests
      })
      .then((response) => {
        this.setState({
          inspections: response.data
        });
        console.log(response.data);
      })
      .catch((response) => {
        // TODO - read up on error handling
        console.log(response);
      });
  }

  render() {
    let { inspections } = this.state;

    let rows = inspections.map(inspection => {
      return (
        <tr>
          <td>{fecha.format(new Date(inspection.date), 'Do MMM YYYY')}</td>
          <td>{inspection.inspector}</td>
          <td>{inspection.comments}</td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <table>
          <tr>
            <th>Date</th>
            <th>Inspector</th>
            <th>Comments</th>
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

export default InspectionReport;
