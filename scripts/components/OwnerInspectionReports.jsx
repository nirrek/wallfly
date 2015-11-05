var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var InspectionReportForm = require('./InspectionReportForm.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');

/**
 * OwnerInspectionReports Component.
 * View component for displaying inspection reports for the currently
 * active property of the current owner user.
 */
var OwnerInspectionReports = React.createClass({
  getInitialState() {
    return {
      inspections: []
    };
  },

  /**
   * Fetches all inspection reports from the server.
   */
  getInspectionReports() {
    var { propertyId } = this.props.params;
    Api.getPropertyInspectionReports({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState({ inspections: response.data });
      }
    });
  },

  componentWillMount() {
    this.getInspectionReports();
  },

  render() {
    var rows = this.state.inspections.map(inspection => {
      return (
        <tr key={inspection.id}>
          <td>{moment(inspection.date).format('Do MMM YYYY')}</td>
          <td><p>{inspection.comments}</p></td>
          <td>
            {inspection.photo ? (
              <img style={styles.img} src={inspection.photo} />
            ) : 'No photo added' }
          </td>
        </tr>
      );
    });

    return (
      <div style={styles.page}>
        <PageHeading>Inspection Reports</PageHeading>
        <table>
          <thead>
            <colgroup style={{width: 140}}></colgroup>
            <tr>
              <th>Date</th>
              <th>Request</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <br />
        <InspectionReportForm
          inspectionReportAdded={this.getInspectionReports}
          propertyID={this.props.params.propertyId} />
      </div>
    );
  }
});

var styles = {
  page: {
    display: 'flex',
    flexFlow: 'column',
  },
  img: {
    maxWidth: 150,
    borderRadius: 4,
  },
};

module.exports = Radium(OwnerInspectionReports);
