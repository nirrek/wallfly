var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');

var InspectionReport = React.createClass({
  getInitialState() {
    return {
      inspections: [], // list of repair requests
    }
  },

  componentWillMount() {
    Api.getInspections({
      callback: (err, response) => {
        if (err) {
          // TODO
          return console.log(err);
        }

        this.setState({ inspections: response.data });
      }
    });
  },

  render() {
    var { inspections } = this.state;

    var rows = inspections.map(inspection => {
      return (
        <tr key={inspection.date}>
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
