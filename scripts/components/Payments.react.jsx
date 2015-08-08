var React = require('react');
var moment = require('moment');
var Api = require('../utils/Api.js');

var Payments = React.createClass({
  getInitialState() {
    return {
      payments: [], // list of recent payments
    };
  },

  componentWillMount() {
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

  render() {
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
    );
  }
});

var style = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
};

export default Payments;
