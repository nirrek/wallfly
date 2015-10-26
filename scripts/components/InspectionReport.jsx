var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');

var InspectionReport = React.createClass({
  getInitialState() {
    return {
      inspections: [], // list of repair requests
    };
  },

  componentWillMount() {
    Api.getInspections({
      callback: (err, response) => {
        if (err) return console.log(err);
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
          <td><img style={style.img} src={inspection.photo} /></td>
        </tr>
      );
    });

    // No inspections
    if (rows.length === 0) {
      rows = (
        <tr>
          <td colSpan="3" style={style.center}>No inspection reports yet</td>
        </tr>
      );
    }

    return (
      <div style={style.page}>
        <PageHeading>Inspection Reports</PageHeading>
        <table>
          <colgroup style={{width: 150}}></colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Inspector</th>
              <th>Comments</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    textAlign: 'center',
  },
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
};

module.exports = Radium(InspectionReport);
