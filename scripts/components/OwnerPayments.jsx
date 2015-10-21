var React = require('react');
var Api = require('../utils/Api.js');
var moment = require('moment');
var MuiContextified = require('./MuiContextified.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var AddPaymentDialog = require('./AddPaymentDialog.jsx');
var MaterialUi = require('material-ui');
var Snackbar = MaterialUi.Snackbar;


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

  render() {
    var propertyId = parseInt(this.props.params.propertyId, 10);

    var rows = this.state.payments.map(payment => {
      return (
        <tr key={payment.id}>
          <td>{moment(payment.date).format('Do MMM YYYY')}</td>
          <td>{payment.propertyId}</td>
          <td>${payment.amount}</td>
        </tr>
      );
    });

    return (
      <div style={style.container}>
        <PageHeading>Payments</PageHeading>
        <table>
          <thead>
            <th>Date</th>
            <th>Property</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <button onClick={this.onShowPaymentDialog}>Add Payment</button>
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
  header: {
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'left',
  },
};

module.exports = MuiContextified(Radium(OwnerPayments));
