var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');
var MuiContextified = require('./MuiContextified.jsx');
var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper;
var PaymentForm = require('./PaymentForm.jsx');

var Payments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
      isFormDisplayed: false,
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
    })
  },

  onButtonClick(){
      this.setState({
          isFormDisplayed: true
      });
  },

   componentWillMount() {
    this.getPayments()
  },

  render() {

    var { payments, isFormDisplayed } = this.state;

    var rows = payments.map(payment => {
      return (
        <tr key={payment.id}>
          <td>{moment(payment.date).format('Do MMM YYYY')}</td>
          <td>{payment.property}</td>
          <td>{payment.amount}</td>
        </tr>
      );
    });

    return (
      <div style={style.page}>
        <h1>Payment History</h1>
        <table>
          <tr>
            <th>Date</th>
            <th>Property</th>
            <th>Amount</th>
          </tr>
          {rows}
        </table>

        <div style={style.formContainer}>
          { isFormDisplayed ? (
            <PaymentForm paymentAdded={this.getPayments}/>
          ) : (
            <RaisedButton label="Make a new Payment" primary={true}
                      onClick={this.onButtonClick} />
          )}
        </div>
      </div>
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
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
};

module.exports = MuiContextified(Payments);
