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
var OwnerRepairRequestStatus = require('./OwnerRepairRequestStatus.jsx');
var Radium = require('radium');

var OwnerRepairRequests = React.createClass({
  getInitialState() {
    return {
      requests: []
    }
  },

  getPropertyRepairRequests(){
    var { propertyId } = this.props.params;
     Api.getPropertyRepairRequests({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        console.log(response.data);
        this.setState({ requests: response.data });
      }
    })
  },

  componentWillMount() {
    this.getPropertyRepairRequests()
  },

  render() {
    var rows = this.state.requests.map(request => {
      return (
        <TableRow key={request.id}>
          <TableRowColumn style={style.dateCol}>{moment(request.date).format('Do MMM YYYY')}</TableRowColumn>
          <TableRowColumn>{request.request}</TableRowColumn>
          <TableRowColumn><img src={request.photo} /> </TableRowColumn>
          <TableRowColumn>{request.status}</TableRowColumn>
          <TableRowColumn>
          <OwnerRepairRequestStatus
              requestId={request.id}
              propertyId={this.props.params.propertyId}
              statusChanged={this.getPropertyRepairRequests}
              status={request.status}
          />
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style={style.container}>
        <Table>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{...style.header, ...style.dateCol}}>Date</TableHeaderColumn>
              <TableHeaderColumn style={style.header}>Request</TableHeaderColumn>
              <TableHeaderColumn style={style.header}>Photo</TableHeaderColumn>
              <TableHeaderColumn style={style.header}>Status</TableHeaderColumn>
              <TableHeaderColumn style={style.header}></TableHeaderColumn>
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
    display: 'flex',
  },
  header: {
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'left',
  },
  dateCol: {
    width: 125
  }
}

module.exports = Radium(MuiContextified(OwnerRepairRequests));
