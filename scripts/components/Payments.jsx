var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var PaymentForm = require('./PaymentForm.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');
var Status = require('./Status.jsx');
var Property = require('../utils/Property.js');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var Snackbar = mui.Snackbar;

var Payments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
      isDialogOpen: false,
      currentPayment: null, // active payment for paying
    };
  },

  getPayments() {
    Api.getAllPayments({
      params: {
        propertyId: Property.getPropertyId()
      },
      callback: (err, res) => {
        if (err) {
          return console.log(err);
        }

        console.log(res.data[0]);

        this.setState({
          payments: res.data
        });
      }
    });
  },

  componentWillMount() {
    this.getPayments();
  },

  payNow(payment) {
    this.setState({
      currentPayment: payment,
      isDialogOpen: true,
    });
  },

  onPaymentSuccess() {
    this.state.currentPayment.isPaid = true;
    this.setState({ isDialogOpen: false });
    this.refs.snackbar.show();
  },

  onCancel() {
    this.setState({ isDialogOpen: false });
  },

  render() {
    var { payments } = this.state;

    var rows = payments.map(payment => {
      var statusColor = payment.isPaid ? 'green' : 'red';
      return (
        <tr key={payment.id}>
          <td>{moment(payment.date).format('Do MMM YYYY')}</td>
          <td>
            <Status type={statusColor}>
              {payment.isPaid ? 'Paid' : 'Unpaid' }
            </Status>
          </td>
          <td>{payment.description}</td>
          <td>${payment.amount}</td>
          <td>
            {!payment.isPaid ? (
              <RaisedButton
                onClick={this.payNow.bind(this, payment)}
                primary={true}
                label="Pay Now" />
            ) : null}
          </td>
        </tr>
      );
    });

    // No payments
    if (rows.length === 0) {
      rows = (
        <tr>
          <td colSpan="3" style={style.center}>No payments yet</td>
        </tr>
      );
    }

    return (
      <div style={style.page}>
        <PageHeading>Payments</PageHeading>
        <table>
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Status</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <div style={style.formContainer}>
          <PaymentForm
            isOpen={this.state.isDialogOpen}
            onPaymentSuccess={this.onPaymentSuccess}
            onCancel={this.onCancel}
            payment={this.state.currentPayment} />
        </div>

        <Snackbar
          ref="snackbar"
          message="Payment Made Successfully"
          autoHideDuration={3000} />
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  formContainer: {
    marginTop: '1em'
  },
  form: {
    display: 'flex',
    padding: '2em',
    flexDirection: 'column',
    maxWidth: '20em',
  },
  center: {
    textAlign: 'center',
  }
};

module.exports = MuiContextified(Radium(Payments));
