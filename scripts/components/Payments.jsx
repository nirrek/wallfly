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

  componentWillMount() {
    this.getPayments()
  },

  render() {

    var { payments } = this.state;

    var rows = this.state.payments.map(payment => {
      return (
        <tr key={payment.date}>
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
      </div>
      <div style={style.page}>
        <RaisedButton
              label="Pay"
              primary={true}
              backgroundColor="#2ECC71"
              style={style.button} />
        <PaymentForm newDataAdded={this.getPayments}/>
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
  button: {
       maxWidth: '10em',
  }
};

module.exports = MuiContextified(Payments);
