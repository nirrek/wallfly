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
var Radium = require('radium');

var OwnerPayments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
    }
  },

  componentWillMount() {
    var { propertyId } = this.props.params;

    Api.getPropertyPayments({
      propertyId,
      callback: (err, response) => {
        if (err) return console.log(err);
        this.setState({ payments: response.data });
      }
    });
  },

  render() {
    var rows = this.state.payments.map(payment => {
      return (
        <TableRow key={payment.id}>
          <TableRowColumn style={style.dateCol}>{moment(payment.date).format('Do MMM YYYY')}</TableRowColumn>
          <TableRowColumn>{payment.propertyId}</TableRowColumn>
          <TableRowColumn>{payment.amount}</TableRowColumn>
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
              <TableHeaderColumn style={style.header}>Property</TableHeaderColumn>
              <TableHeaderColumn style={style.header}>Amount</TableHeaderColumn>
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

module.exports = MuiContextified(Radium(OwnerPayments));
