var React = require('react');
var Api = require('../utils/Api.js');
var MaterialUi = require('material-ui');
var Table = MaterialUi.Table;
var TableHeader = MaterialUi.TableHeader;
var TableBody = MaterialUi.TableBody;
var TableFooter = MaterialUi.TableFooter;
var TableRow = MaterialUi.TableRow;
var TableHeaderColumn = MaterialUi.TableHeaderColumn;
var TableRowColumn = MaterialUi.TableRowColumn;
var MuiContextified = require('./MuiContextified.jsx');
var moment = require('moment');
var InspectionReportForm = require('./InspectionReportForm.jsx');


var OwnerInspectionReports = React.createClass({
  getInitialState() {
    return {
      inspections: []
    }
  },

  getInspectionReports() {
    var { propertyId } = this.props.params;
    Api.getPropertyInspectionReports({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        console.log(response.data);
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
        <TableRow key={inspection.id}>
          <TableRowColumn style={style.dateCol}>{moment(inspection.date).format('Do MMM YYYY')}</TableRowColumn>
          <TableRowColumn><p>{inspection.comments}</p></TableRowColumn>
          <TableRowColumn>
            {inspection.photo ? (
              <img src={inspection.photo} />
            ) : 'No photo added' }
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style={style.container}>
        <InspectionReportForm
          inspectionReportAdded={this.getInspectionReports}
          propertyID={this.props.params.propertyId} />
        <Table>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{...style.header, ...style.dateCol}}>Date</TableHeaderColumn>
              <TableHeaderColumn style={style.header}>Request</TableHeaderColumn>
              <TableHeaderColumn style={style.header}>Photo</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}>
            {rows}
          </TableBody>
        </Table>

      </div>
    );
  }
});

var style = {
  container: {
    //display: 'flex',
  },
  header: {
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'left',
  },
  dateCol: {
    width: 125
  },
}

module.exports = MuiContextified(OwnerInspectionReports);
