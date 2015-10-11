var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var PaymentForm = require('./PaymentForm.jsx');
var Radium = require('radium');
var PageHeading = require('./PageHeading.jsx');

var Payments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
    };
  },

  getPayments() {
    Api.getPayments({
      callback: (err, response) => {
        if (err) {
          // TODO
          return console.log(err);
        }

        this.setState({
          payments: response.data
        });
      }
    });
  },

   componentWillMount() {
    this.getPayments();
  },

  render() {
    var { payments } = this.state;

    var rows = payments.map(payment => {
      return (
        <tr key={payment.id}>
          <td>{moment(payment.date).format('Do MMM YYYY')}</td>
          <td>{payment.property}</td>
          <td>${payment.amount}</td>
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
              <th>Date</th>
              <th>Property</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <div style={style.formContainer}>
          <PaymentForm paymentAdded={this.getPayments}/>
        </div>
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
