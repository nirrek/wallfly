var React = require('react');
var axios = require('axios');
var config = require('../utils/config.js');
var moment = require('moment');

// simulate a user Store
var user = {
  id: 5,
}

var InspectionReport = React.createClass({
  getInitialState() {
    return {
      inspections: [], // list of repair requests
    }
  },

  componentWillMount() {
    axios.get(`${config.server}/users/${user.id}/inspections`, {
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
  },

  render() {
    var { inspections } = this.state;

    var rows = inspections.map(inspection => {
      return (
        <tr>
          <td>{moment(inspection.date).format('Do MMM YYYY')}</td>
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
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default InspectionReport;
