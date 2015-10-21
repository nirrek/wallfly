var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var AddPaymentDialog = require('./AddPaymentDialog.jsx');
var Status = require('./Status.jsx');
var MaterialUi = require('material-ui');
var Snackbar = MaterialUi.Snackbar;
var RaisedButton = MaterialUi.RaisedButton;

var FixedDataTable = require('fixed-data-table');
require('../../styles/fixed-data-table.css');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var OwnerPayments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
      showPaymentDialog: false,
    };
  },

  componentWillMount() {
    this.fetchPayments();
  },

  fetchPayments() {
    Api.getAllPayments({
      params: {
        propertyId: this.props.params.propertyId
      },
      callback: (err, res) => {
        if (err) return console.log(err);
        this.setState({ payments: res.data });
      }
    });
  },

  onShowPaymentDialog() { this.setState({ showPaymentDialog: true }); },

  onPaymentDialogClose() { this.setState({ showPaymentDialog: false }); },

  onPaymentAdded() {
    this.fetchPayments();
    this.setState({ showPaymentDialog: false });
    this.refs.snackbar.show();
  },

  rowGetter(rowIndex) {
    var row = this.state.payments[rowIndex];

    return [
      moment(row.dateDue).format('Do MMM YYYY'),
      row.isPaid,
      row.description,
      `$${row.amount.toFixed(2)}`,
    ];
  },

  isPaidRenderer(data) {
    var statusColor = data ? 'green' : 'red';
    return (
      <div className="public_fixedDataTableCell_cellContent">
        <Status type={statusColor}>
          {data ? 'Paid' : 'Unpaid' }
        </Status>
      </div>
    );
  },

  render() {
    var propertyId = parseInt(this.props.params.propertyId, 10);

    var rowHeight = Math.min((window.innerHeight * 5) / 8,
      50 * (this.state.payments.length + 1) + 2);

    return (
      <div style={style.container}>
        <PageHeading>Payments</PageHeading>
        <Table
          rowHeight={50}
          rowGetter={this.rowGetter}
          rowsCount={this.state.payments.length}
          width={705}
          height={rowHeight}
          headerHeight={50}
          footerHeight={0}
          >
          <Column
            label="Due Date"
            width={130}
            dataKey={0}
          />
          <Column
            label="Status"
            width={85}
            dataKey={1}
            cellRenderer={this.isPaidRenderer}
          />
          <Column
            label="Description"
            width={400}
            dataKey={2}
          />
          <Column
            label="Amount"
            width={90}
            dataKey={3}
          />
        </Table>
        <div style={style.btnContainer}>
          <RaisedButton primary={true} label="Add Payment" onClick={this.onShowPaymentDialog} />
        </div>
        <AddPaymentDialog isOpen={this.state.showPaymentDialog}
                          onClose={this.onPaymentDialogClose}
                          onAddPayment={this.onPaymentAdded}
                          propertyId={propertyId} />
        <Snackbar
          ref="snackbar"
          message="Payment Successfully Added"
          autoHideDuration={3000} />
      </div>
    );
  }
});

var style = {
  container: {
    display: 'flex',
    flexFlow: 'column',
  },
  btnContainer: {
    marginTop: '1em',
  }
};

module.exports = MuiContextified(Radium(OwnerPayments));
